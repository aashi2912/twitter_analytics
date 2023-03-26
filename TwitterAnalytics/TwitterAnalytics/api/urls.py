from django.urls import path
from .views import Hashtag

urlpatterns = [
    # path('users/<str:userId>/', BookDetail.as_view()),
    path('hashtag/<str:hashtag>', Hashtag.as_view()),
]