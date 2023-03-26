from django.db import models

# Tweet model will give tweet information. It will include all the analytics and aggregations
class Tweet:
    a = 10
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    date = models.DateField()


# user will handle fetching/creating twitter users in db
class User:
    userid = 10
    username = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    followersCount = models.IntegerField()

