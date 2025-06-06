from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import DatabaseError
from django.views.generic import View
from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from business.models import Business,Service
from core.models import Category,Subcategory
from django.http import JsonResponse
User =get_user_model()


class Adminstats(View):
    
    def get(self, request, *args, **kwargs):
        # Count total businesses
        total_businesses = Business.objects.count()
        
        # Count total categories
        total_categories = Category.objects.count()
        
        # Count pending approvals (assuming status='pending' exists in Business model)
        pending_approvals = Business.objects.filter(status='pending').count()
        
        # Count total users excluding admin
        total_users = User.objects.filter(is_superuser=False).count()
        
        # Count total reports
        # total_reports = Report.objects.count()
        
        # Fetch recent activities (assuming ActivityLog stores logs)
        # recent_activities = ActivityLog.objects.order_by('-timestamp')[:10]  # Get last 10 activities
        
        data = {
            "total_businesses": total_businesses,
            "total_categories": total_categories,
            "pending_approvals": pending_approvals,
            "total_users": total_users,
            "total_reports": 0,
            # "recent_activities": list(recent_activities.values('user__username', 'action', 'timestamp')),
        }
        
        return JsonResponse(data)



class BusinessListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Fetch all businesses with necessary details (Using 'user' as ForeignKey to User)
            businesses = Business.objects.select_related("user").values(
                "business_id",  # Business ID
                "business_name",  # Business Name
                "user__first_name",  # Owner's First Name
                "user__email",  # Owner's Email
                "contact_info",  # Business Contact
                "address",  # Business Address
                "pincode",  # Pincode
                "logo_url",  # Logo URL
                "status",  # Business Status
                "created_at",  # Date Created
                "updated_at",  # Date Updated
            )

            # If no businesses are found
            if not businesses:
                return Response(
                    {"status": "success", "message": "No businesses found.", "businesses": []},
                    status=status.HTTP_200_OK
                )

            # Return the formatted JSON response
            return Response(
                {
                    "status": "success",
                    "total_businesses": len(businesses),
                    "businesses": list(businesses),
                },
                status=status.HTTP_200_OK
            )

        except DatabaseError:
            return Response(
                {"status": "error", "message": "Database error. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            return Response(
                {"status": "error", "message": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# _________________________________________________________________________________________________________________________________________________


from django.shortcuts import get_object_or_404
from .serializers import BusinessSerializer
class ServiceRequestView(APIView):
    """
    - GET: Returns all businesses with 'Pending' status.
    - POST: Updates the status of a business request.
    """

    def get(self, request, *args, **kwargs):
        """Fetch all businesses that are in 'Pending' state."""
        pending_businesses = Business.objects.filter(status="Pending")
        serializer = BusinessSerializer(pending_businesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """Update the status of a business (approve/reject)."""
        business_id = request.data.get("business_id")
        new_status = request.data.get("status")

        if new_status not in ["Approved", "Rejected"]:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        business = get_object_or_404(Business, business_id=business_id)
        business.status = new_status
        business.save()

        return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)


# _____________________________________________________


from .serializers import CategorySerializer, SubcategorySerializer
class CategorySubcategoryView(APIView):
    def get(self, request):
        categories = Category.objects.prefetch_related('subcategory_set').all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        response_data = {}
        
        # Handle Category creation
        if 'category' in data:
            category_serializer = CategorySerializer(data=data['category'])
            if not category_serializer.is_valid():
                return Response(
                    {'category_errors': category_serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
            category = category_serializer.save()
            response_data['category'] = category_serializer.data

        # Handle Subcategory creation
        if 'subcategory' in data:
            if 'category' not in data['subcategory']:
                return Response(
                    {'error': 'category field is required for subcategory creation'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            try:
                category = Category.objects.get(category_id=data['subcategory']['category'])
            except Category.DoesNotExist:
                return Response(
                    {'error': 'Specified category does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
                
            # Remove category from subcategory data before serialization
            subcategory_data = data['subcategory'].copy()
            subcategory_data.pop('category', None)
            
            subcategory_serializer = SubcategorySerializer(data=subcategory_data)
            if not subcategory_serializer.is_valid():
                return Response(
                    {'subcategory_errors': subcategory_serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
            subcategory = subcategory_serializer.save(category=category)
            response_data['subcategory'] = subcategory_serializer.data

        if not response_data:
            return Response(
                {'error': 'No valid data provided for creation'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(response_data, status=status.HTTP_201_CREATED)