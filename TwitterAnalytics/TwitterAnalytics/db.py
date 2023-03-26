from pymongo import MongoClient

# import json

client = MongoClient('mongodb://localhost:27017')
dbname = client['TwitterAnalytics']

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


# tweet = """{
#     "id": 1622770990710235100,
#     "conversation_id": "1622770990710235136",
#     "created_at": "2023-02-06 20:35:28 EST",
#     "date": "2023-02-06",
#     "time": "20:35:28",
#     "timezone": "-0500",
#     "user_id": 813286,
#     "username": "barackobama",
#     "name": "Barack Obama",
#     "place": "",
#     "tweet": "The scale of devastation after the earthquakes in Türkiye and Syria is almost unimaginable. Michelle and I are thinking of the thousands of people who have been affected, including Syrian refugees. Here are some resources for anyone looking to help.",
#     "language": "en",
#     "mentions": [],
#     "urls": [],
#     "photos": [],
#     "replies_count": 580,
#     "retweets_count": 2154,
#     "likes_count": 12169,
#     "hashtags": [],
#     "cashtags": [],
#     "link": "https://twitter.com/BarackObama/status/1622770990710235136",
#     "retweet": false,
#     "quote_url": "https://twitter.com/ObamaFoundation/status/1622735884914159617",
#     "video": 0,
#     "thumbnail": "",
#     "near": "",
#     "geo": "",
#     "source": "",
#     "user_rt_id": "",
#     "user_rt": "",
#     "retweet_id": "",
#     "reply_to": [],
#     "retweet_date": "",
#     "translate": "",
#     "trans_src": "",
#     "trans_dest": ""
# }"""

# tweet_json = json.loads(tweet)

# print(tweet_json)

# inserted = collection.insert_one(tweet_json)

# print(inserted)