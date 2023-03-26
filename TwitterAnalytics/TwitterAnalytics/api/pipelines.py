def getUserStage(userkey, isReply: bool):
    print(userkey, type(userkey))
    if (isReply):
        return { '$match': {
            'reply_to': {
                '$elemMatch': {
                    'id': userkey
                }
            }
        } }
    
    return { '$match': { 'username': userkey } }


def getHashtagStage(hashtag: str):
    return { '$match': { 'hashtags': { '$in': [hashtag] } } }


def getTopicAndSentimentPipeline():
    return [
        { '$sort': { 'created_at': -1 } },
        { '$limit': 100000 },
        { '$unwind': '$topics' },
        { '$group': {
            '_id': {
                'topic': '$topics',
                'sentiment': '$sentiment'
            },
            'count': {
                '$sum': 1
            }    
        }  },
        { '$sort': {
            'count': -1
        }  }
    ]


def getPipelineForUserHashtag(username: str, tag: str):
    pipeline = getTopicAndSentimentPipeline()
    hashtagStage = getHashtagStage(tag)
    userStage = getUserStage(username, False)
    pipeline.insert(0, hashtagStage)
    pipeline.insert(0, userStage)
    print(pipeline)
    return pipeline


def getPipelineForUser(username: str):
    pipeline = getTopicAndSentimentPipeline()
    userStage = getUserStage(username, False)
    pipeline.insert(0, userStage)
    return pipeline


def getPipelineForUserReplies(userId: str):
    pipeline = getTopicAndSentimentPipeline()
    userStage = getUserStage(userId, True)
    pipeline.insert(0, userStage)
    return pipeline


def getPipelineForHashtag(tag: str):
    pipeline = getTopicAndSentimentPipeline()
    hashtagStage = getHashtagStage(tag)
    pipeline.insert(0, hashtagStage)
    return pipeline

def getUserEngagementPipeline(username: str):
    return [
        { '$match': { 'username': username } },
        { '$sort': { 'created_at': -1 } },
        { '$limit': 100000 },
        { '$group': {
            '_id': None,
            'likes_count': { '$sum': '$likes_count' },
            'retweets_count': { '$sum': '$retweets_count' },
            'replies_count': { '$sum': '$replies_count' }
        } },
        {
            '$project': {
            '_id': 0,
            'likes_count': 1,
            'retweets_count': 1,
            'replies_count': 1
            }
        }
    ]