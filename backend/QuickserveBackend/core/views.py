from django.http import HttpResponse
from .models import Category,Subcategory
from rest_framework.permissions import IsAuthenticated,AllowAny
from business.models import Service
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, SessionAuthentication

from rest_framework import status
from .serializers import CategorySerializer,SubcategorySerealizer



class CategoryAPIView(APIView):
    authentication_classes = [] 

    permission_classes = [AllowAny]

    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class SubCategoryView(APIView):
    authentication_classes = [] 
    permission_classes = [AllowAny]

    def get(self, request,category_id):
        # Get the category_id from the request query parameters
        # category_id = request.query_params.get('category_id')

        # Check if category_id is provided
        if not category_id:
            return Response(
                {"error": "category_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch subcategories for the given category_id
        try:
            category = Category.objects.get(category_id=category_id)
            subcategories = Subcategory.objects.filter(category=category)
            serializer = SubcategorySerealizer(subcategories, many=True)
            print(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"},
                status=status.HTTP_404_NOT_FOUND
            )
