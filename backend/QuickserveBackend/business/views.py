

# Create your views here.
from rest_framework import viewsets
from .models import   Service
from core.models import Category,Subcategory
from .serializers import CategorySerializer, SubCategorySerializer, ServiceSerializer

from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Category, Subcategory, Business, Service
# from .serializers import CategorySerializer, SubcategorySerializer, ServiceSerializer

# Add a new service 
class AddServiceView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can add services

    def post(self, request):
        user = request.user  # Logged-in user
        data = request.data

        # Validate inputs
        category_id = data.get("category")
        subcategory_id = data.get("subcategory")
        name = data.get("service_name")
        description = data.get("description")
        price = data.get("price")

        # Ensure required fields are provided
        if not all([category_id, subcategory_id, name, description, price]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Get instances of related models
        category = get_object_or_404(Category, category_id=category_id)
        subcategory = get_object_or_404(Subcategory, subcategory_id=subcategory_id, category_id=category_id)

        # Get the business owned by the logged-in user
        try:
            business = Business.objects.get(user=user)
        except Business.DoesNotExist:
            return Response({"error": "You do not have a registered business."}, status=status.HTTP_403_FORBIDDEN)

        # Create and save the service
        service = Service.objects.create(
            business=business,
            Category=category,
            subcategory=subcategory,
            service_name=name,
            description=description,
            price=price,
        )

        return Response({"message": "Service added successfully!", "service_id": service.service_id}, status=status.HTTP_201_CREATED)
