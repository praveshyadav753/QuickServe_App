from django.contrib import admin
from django.urls import path
from .views import AddServiceView


urlpatterns = [
    path("addservice/", AddServiceView.as_view(), name="user-business-reviews"),
]