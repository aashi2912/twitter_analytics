from pymongo import MongoClient

# import json

client = MongoClient('mongodb://localhost:27017')
dbname = client['TweetAnalytics']

TweetCollection = dbname['tweets']
UsersCollection = dbname['users']
RepliesCollection = dbname['replies']

# This will get the user with given userId
def getUser(userId):
    return

# This will insert the user with given user object
def insertUser(user): 
    return

# This will give user data like sentiments, like counts, retweets counts, etc on top tweets. This will require aggregation
def dashboarUserdData():
    return

# This will give Tweet information like number of retweets, replies count, discussion topics and sentiments on latest replies 
def dashboardTweetData():
    return
