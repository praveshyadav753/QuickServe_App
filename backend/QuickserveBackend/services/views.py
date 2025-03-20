from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from .serializers import ServiceSerializer,ServiceDetailSerializer
from core.models import Subcategory,Category
from business.models import Service

class ServicesAPIView(APIView):  # Fixed class name capitalization
    def get(self, request):
        subcategory_id = request.query_params.get("subcategory_id")  # Fixed reference

        if not subcategory_id:
            return Response(
                {"error": "subcategory_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            subcategory = Subcategory.objects.get(subcategory_id=subcategory_id)  # Fixed reference
            services = Service.objects.filter(subcategory=subcategory).select_related('business')  # Fixed relation lookup
            
            # Optionally, serialize the services if neededserializer = ServiceSerializer(services, many=True)  # ✅ many=True ensures an array response
            serializer = ServiceSerializer(services, many=True)  # ✅ many=True ensures an array response
            return Response(serializer.data, status=status.HTTP_200_OK)  
        except Subcategory.DoesNotExist:  
            return Response(
                {"error": "Subcategory not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Service.DoesNotExist:
            return Response(
                {"error": "No services found for this subcategory"},
                status=status.HTTP_404_NOT_FOUND
            )
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
        