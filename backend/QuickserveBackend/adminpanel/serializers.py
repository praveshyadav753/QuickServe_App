from rest_framework import serializers
from business.models import Business 

class BusinessSerializer(serializers.ModelSerializer):
    # business_name = serializers.CharField(source="business.name", read_only=True)

    class Meta:
        model = Business
        fields = ["business_id", "business_name", "status", "created_at"]
