from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import CartItem
from business.models import Service
from .serializers import CartItemSerializer

User = get_user_model()

class SyncCartView(APIView):
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users can sync their cart

    def post(self, request):
        user = request.user  # Authenticated user
        guest_cart = request.data.get("guestCart", [])  # Cart data from localStorage

        for item in guest_cart:
            service_id = item.get("service_id")  # Ensure the frontend sends the correct field
            quantity = item.get("quantity", 1)

            # Validate if the service exists
            service = get_object_or_404(Service, service_id=service_id)

            # Check if item already exists in the user's cart
            cart_item, created = CartItem.objects.get_or_create(user=user, service=service)
            if not created:
                cart_item.quantity += quantity  # Merge quantities
            cart_item.save()

        # Fetch updated cart
        cart_items = CartItem.objects.filter(user=user)
        serialized_cart = CartItemSerializer(cart_items, many=True)

        return Response(serialized_cart.data, status=status.HTTP_200_OK)


class UserCartView(APIView):
    permission_classes = [IsAuthenticated]  # User must be logged in

    def get(self, request):
        """Fetches the cart of the authenticated user."""
        cart_items = CartItem.objects.filter(user=request.user)
        serialized_cart = CartItemSerializer(cart_items, many=True)
        return Response(serialized_cart.data, status=status.HTTP_200_OK)
