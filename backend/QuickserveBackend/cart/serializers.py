from rest_framework import serializers
from .models import CartItem
from business.models import Service

class CartItemSerializer(serializers.ModelSerializer):
    service_id = serializers.PrimaryKeyRelatedField(source='service', queryset=Service.objects.all())  # Service ID only
    service_name = serializers.CharField(source='service.service_name', read_only=True)
    price = serializers.DecimalField(source='service.price', max_digits=10, decimal_places=2, read_only=True)
    image_url = serializers.ImageField(source='service.image_url', read_only=True)  # Assuming `image` is an ImageField

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'service_id', 'service_name', 'price', 'image_url', 'quantity', 'added_at']
        read_only_fields = ['user']
