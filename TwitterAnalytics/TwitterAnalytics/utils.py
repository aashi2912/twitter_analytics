# Create a method to find topic categories and sentiments using tweetnlp

import json
from pymongo import MongoClient
import tweetnlp

client = MongoClient('mongodb://localhost:27017')
dbname = client['TwitterAnalytics']

TweetCollection = dbname['tweets']
RepliesCollection = dbname['replies']
UsersCollection = dbname['users']

sentimentModel = tweetnlp.Sentiment(multilingual=True)
topicClassificationModel = tweetnlp.TopicClassification()


def generateSentimentAndTopicCategories(tweetText: str):
   data = {}
   data["topics"] = topicClassificationModel.topic(tweetText)['label']
   data["sentiment"] = sentimentModel.sentiment(tweetText)['label']
   return data


def dumpBatchToDatabase(batch: list, collection):

   for data in batch:
      # Insert each document into the database
      analytics = generateSentimentAndTopicCategories(data['tweet'])
      data['topics'] = analytics['topics']
      data['sentiment'] = analytics['sentiment']
      # print(data)
   
   # for document in data:
      # collection.insert_one(document)
   collection.insert_many(batch)
#    print('Done with a batch')
   # Close the MongoDB connection
   # client.close()


with open('../ADT/tweets.json', 'r') as f:
    batch = []
   #  TweetCollection.delete_many({})
    for line in f:
        batch.append(json.loads(line))

        # If batch is full, process it and clear the list
        if len(batch) >= 1000:
            dumpBatchToDatabase(batch, TweetCollection)
            batch = []

    # Process any remaining documents in the last batch
    if len(batch) > 0:
        dumpBatchToDatabase(batch, TweetCollection)

print("File tweets.json completed")

with open('../ADT/replies.json', 'r') as f:
    batch = []
   #  TweetCollection.delete_many({})
    for line in f:
        batch.append(json.loads(line))

        # If batch is full, process it and clear the list
        if len(batch) >= 1000:
            dumpBatchToDatabase(batch, RepliesCollection)
            batch = []

    # Process any remaining documents in the last batch
    if len(batch) > 0:
        dumpBatchToDatabase(batch, RepliesCollection)

print("File replies.json completed")
