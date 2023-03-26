from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from bson.json_util import dumps

from TwitterAnalytics.db import TweetCollection, UsersCollection, RepliesCollection
from .pipelines import getPipelineForHashtag, getPipelineForUser, getPipelineForUserHashtag, getPipelineForUserReplies, getUserEngagementPipeline

url = 'localhost:8000/hashtags/elonmusk'



# /tweets/:id
# /user/:username
# /search/:hashtag

class HashtagAggregates(APIView):

    def get(self, request, hashtag):
        pipeline = getPipelineForHashtag(hashtag)
        tweetResults = list(TweetCollection.aggregate(pipeline))
        # repliesResults = list(RepliesCollection.aggregate(pipeline))
        result = {
            'tweets': tweetResults,
            # 'replies': repliesResults
        }
        return Response(dumps(result))

class UserHashtagAggregates(APIView):

    def get(self, request, username, hashtag):
        pipeline = getPipelineForUserHashtag(username, hashtag)
        tweetResults = list(TweetCollection.aggregate(pipeline))
        # repliesResults = list(RepliesCollection.aggregate(pipeline))
        result = {
            'tweets': tweetResults,
            # 'replies': repliesResults
        }
        return Response(dumps(result))


class UserAggregates(APIView):

    def get(self, request, username):
        pipeline = getPipelineForUser(username)
        print(pipeline)
        tweetResults = list(TweetCollection.aggregate(pipeline))
        userid = 0
        document = TweetCollection.find_one({'username': username})
        if document:
            userid = document['user_id']

        pipeline = getPipelineForUserReplies(str(userid))
        repliesResults = list(RepliesCollection.aggregate(pipeline))

        pipeline = getUserEngagementPipeline(username)
        engagementMetrics = list(TweetCollection.aggregate(pipeline))

        result = {
            'tweets': tweetResults,
            'replies': repliesResults,
            'engagement': engagementMetrics
        }

        return Response(dumps(result))
