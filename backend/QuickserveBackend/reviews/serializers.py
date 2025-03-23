from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.first_name")
    service = serializers.CharField(source="service.service_name")

    class Meta:
        model = Review
        fields = ["review_id", "user", "rating", "comment", "service", "created_at"]
