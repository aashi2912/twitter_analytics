from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from bson.json_util import dumps

from TwitterAnalytics.db import TweetCollection, UsersCollection, RepliesCollection
from TwitterAnalytics.models import Tweet, User
from .serializers import TweetSerializer, UserSerializer
import pipelines

url = 'localhost:8000/hashtags/elonmusk'



# /tweets/:id
# /user/:username
# /search/:hashtag

class HashtagAggregates(APIView):

    def get(self, request, hashtag):
        pipeline = pipelines.getPipelineForUserHashtag(hashtag)
        tweetResults = list(TweetCollection.aggregate(pipeline))
        repliesResults = list(RepliesCollection.aggregate(pipeline))
        result = tweetResults + repliesResults
        return dumps(result)

class UserHashtagAggregates(APIView):

    def get(self, request, username, hashtag):
        pipeline = pipelines.getPipelineForUserHashtag(username, hashtag)
        tweetResults = list(TweetCollection.aggregate(pipeline))
        repliesResults = list(RepliesCollection.aggregate(pipeline))
        result = tweetResults + repliesResults
        return dumps(result)


class UserAggregates(APIView):

    def get(self, request, username, hashtag):
        pipeline = pipelines.getPipelineForUserHashtag(username)
        tweetResults = list(TweetCollection.aggregate(pipeline))
        repliesResults = list(RepliesCollection.aggregate(pipeline))
        result = tweetResults + repliesResults
        return dumps(result)


class UserData(APIView):

    def get(self, request, userId, hashtag):
        return


class UserList(APIView):
    serializer_class = UserSerializer

    def get(self, request, userId):
        return

    def put(self, request, userId):
        user = User
        UsersCollection.aggregate({

        })
        serializer = UserSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userId):
        book = get_object_or_404(User, pk=userId)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TweetList(APIView):
    serializer_class = UserSerializer


    def get(self, request, userId):
        return

    def put(self, request, userId):
        serializer = UserSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userId):
        book = get_object_or_404(User, pk=userId)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)