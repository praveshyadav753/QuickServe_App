from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source="service.name", read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'service_name', 'booking_date', 'timeslot', 'status', 'created_at']
