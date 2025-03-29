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
        business_id = request.data.get("id")
        new_status = request.data.get("status")

        if new_status not in ["Approved", "Rejected"]:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        business = get_object_or_404(Business, id=business_id)
        business.status = new_status
        business.save()

        return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)
