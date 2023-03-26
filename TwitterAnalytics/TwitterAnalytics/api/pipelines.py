def getTopicAndSentimentPipeline():
    return [
        { '$sort': { 'created_at': -1 } },
        { '$limit': 100000 },
        { '$unwind': '$topic_categories' },
        { '$group': {
            '_id': {
                'topic_categories': '$topic_categories',
                'sentiment': '$sentiment'
            },
            'topic_total': { '$sum': '$topic_categories' },
            'sentiment_total': { '$sum': '$topic_categories' },
            'engagement': {"$sum": {"$add": ["$likes_count", "$retweet_count", "$replies_count"]}}
        } },
        { '$sort': { 'topic_total': -1 } }
    ]


def getPipelineForUserHashtag(username, tag):
    pipeline = getTopicAndSentimentPipeline(tag)
    userHashtagStage = { '$math': { 'username': username, 'hashtag': tag } }
    pipeline.insert(0, userHashtagStage)
    return pipeline


def getPipelineForUser(username):
    pipeline = getTopicAndSentimentPipeline()
    userStage = { '$match': { 'username': username } }
    pipeline.insert(0, userStage)
    return pipeline


def getPipelineForHashtag(tag):
    pipeline = getTopicAndSentimentPipeline()
    hashtagStage = { '$match': { 'hashtag': tag } }
    pipeline.insert(0, hashtagStage)
    return pipeline
