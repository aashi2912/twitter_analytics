from django.urls import path
from .views import UserHashtagAggregates, HashtagAggregates, UserAggregates

urlpatterns = [
    # path('users/<str:userId>/', BookDetail.as_view()),
    path('tag/<str:hashtag>', HashtagAggregates.as_view()),
    path('user/<str:username>', UserAggregates.as_view()),
    path('user/<str:username>/tag/<str:hashtag>', UserHashtagAggregates.as_view())
]