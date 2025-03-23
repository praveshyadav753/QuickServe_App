from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from .serializers import ServiceSerializer,ServiceDetailSerializer
from core.models import Subcategory,Category
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from business.models import Business

from business.models import Service

class ServicesAPIView(APIView):  
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow public access but authenticate business users

    def get(self, request):
        role = request.query_params.get("role", "").lower()  # Get role if provided, default to ""
        subcategory_id = request.query_params.get("subcategory_id")

        # 🏢 If role is 'business' and user is authenticated, return business services
        if role == "business":
            print("business request")
            if not request.user.is_authenticated:
                return Response({"error": "Authentication required for business services"}, status=status.HTTP_401_UNAUTHORIZED)
            
            try:
                business = Business.objects.get(user=request.user)
                services = Service.objects.filter(business=business)
                serializer = ServiceSerializer(services, many=True)
                return Response({"success": True, "services": serializer.data}, status=status.HTTP_200_OK)
            except Business.DoesNotExist:
                return Response({"error": "Business not found"}, status=status.HTTP_404_NOT_FOUND)

        # 🌎 If subcategory_id is provided, return public services filtered by subcategory
        if subcategory_id:
            try:
                subcategory = get_object_or_404(Subcategory, subcategory_id=subcategory_id)
                services = Service.objects.filter(subcategory=subcategory).select_related("business")
                serializer = ServiceSerializer(services, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Subcategory.DoesNotExist:
                return Response({"error": "Subcategory not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
    
    
class ServiceDetailView(APIView):
    """API to fetch detailed view of a service along with all reviews"""

    def get(self, request, service_id):
        try:
            # Fetch service or return 404 if not found
            service = get_object_or_404(Service, service_id=service_id)

            # Serialize the service data
            serializer = ServiceDetailSerializer(service)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Service.DoesNotExist:
            return Response(
                {"error": "Service not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        except DatabaseError:
            return Response(
                {"error": "Database error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        