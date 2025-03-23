from django.urls import path
from .views import UserBusinessReviewListView

urlpatterns = [
    path("my-business/", UserBusinessReviewListView.as_view(), name="user-business-reviews"),
]
