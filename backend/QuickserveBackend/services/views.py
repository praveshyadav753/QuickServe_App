from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from .serializers import ServiceSerializer,ServiceDetailSerializer
from core.models import Subcategory,Category
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from business.models import Business

from business.models import Service

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication

class ServicesAPIView(APIView):
    """Fetches services. Business users require authentication, public users do not."""
    
    authentication_classes = [JWTAuthentication]  # ✅ Use JWT authentication
    
    def get_permissions(self):
        """Dynamically set permissions: 
        - Public users: No authentication needed.
        - Business users: Authentication required."""
        
        if self.request.query_params.get("role", "").lower() == "business":
            return [IsAuthenticated()]  # Business users must be authenticated
        return [AllowAny()]  # Public access allowed

    def get(self, request):
        role = request.query_params.get("role", "").lower()  
        subcategory_id = request.query_params.get("subcategory_id")

        # 🏢 Handle business user requests
        if role == "business":
            if not request.user.is_authenticated:
                return Response({"error": "Authentication required for business services"}, status=status.HTTP_401_UNAUTHORIZED)
            
            try:
                business = Business.objects.get(user=request.user)
                services = Service.objects.filter(business=business)
                serializer = ServiceSerializer(services, many=True)
                return Response({"success": True, "services": serializer.data}, status=status.HTTP_200_OK)
            except Business.DoesNotExist:
                return Response({"error": "Business not found"}, status=status.HTTP_404_NOT_FOUND)

        # 🌎 Handle public service requests by subcategory
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
    authentication_classes = [] 

    permission_classes = [AllowAny]

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
        