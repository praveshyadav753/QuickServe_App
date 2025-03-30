from rest_framework import serializers
from business.models import Business 

class BusinessSerializer(serializers.ModelSerializer):
    # business_name = serializers.CharField(source="business.name", read_only=True)

    class Meta:
        model = Business
        fields = ["business_id", "business_name", "status", "created_at"]



from core.models import Category, Subcategory



class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['subcategory_id', 'subcategory_name', 'image_url', 'created_at', 'updated_at']

class CategorySerializer(serializers.ModelSerializer):
    # Use source='subcategory_set' to match your model's default related_name
    subcategories = SubcategorySerializer(source='subcategory_set', many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['category_id', 'category_name', 'image_url', 'created_at', 'updated_at', 'subcategories']