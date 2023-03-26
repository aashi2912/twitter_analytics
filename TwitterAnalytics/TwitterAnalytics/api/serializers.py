from rest_framework import serializers
from TwitterAnalytics.models import Tweet, User

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
         model = Tweet
         fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = '__all__'
