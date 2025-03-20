from rest_framework import serializers
from .models import Category,Subcategory
from business.models import Service,Business
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["category_id", "category_name","image_url"]
        
class SubcategorySerealizer(serializers.ModelSerializer):
    class Meta:
        model =Subcategory    
        fields =["subcategory_id",
    "category",
    "image_url" ,
    "subcategory_name"
]    
