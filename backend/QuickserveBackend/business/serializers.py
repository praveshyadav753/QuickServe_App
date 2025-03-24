from rest_framework import serializers

from rest_framework import serializers
from .models import  Service
from core.models  import Subcategory,Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = "__all__"

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "description", "category", "subcategory", "price", "created_by"]
        read_only_fields = ["created_by"]  # Prevent users from modifying `created_by`
