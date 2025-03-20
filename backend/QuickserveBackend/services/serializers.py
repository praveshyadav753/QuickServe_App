from rest_framework import serializers
from django.db.models import Avg
from business.models import Service
from reviews.models import Review  # Assuming Review is in the 'reviews' app

class ServiceSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(source='business.business_name', read_only=True)  # Fetch Business Name
    average_rating = serializers.SerializerMethodField()  # Compute average rating
    total_reviews = serializers.SerializerMethodField()   # Count total reviews

    class Meta:
        model = Service
        fields = '__all__'  # Include all model fields
        extra_fields = ['business_name', 'average_rating', 'total_reviews']  # Append additional fields

    def get_average_rating(self, obj):
        """Returns the average rating of the service from the Review model"""
        avg_rating = Review.objects.filter(service=obj).aggregate(avg_rating=Avg('rating'))['avg_rating']
        return round(avg_rating, 1) if avg_rating is not None else 0.0  # Ensures 1 decimal place

    def get_total_reviews(self, obj):
        """Returns the total number of reviews for the service"""
        return Review.objects.filter(service=obj).count()


class ServiceDetailSerializer(serializers.ModelSerializer):
    # Business Details
    business_name = serializers.CharField(source='business.business_name', read_only=True)
    location = serializers.CharField(source='business.address', read_only=True)

    # Computed Fields
    average_rating = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()

    # Nested Reviews
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = '__all__'  # Include all Service model fields
        extra_fields = ['business_name', 'location', 'average_rating', 'total_reviews', 'reviews']

    def get_average_rating(self, obj):
        """Returns the average rating of the service from the Review model"""
        avg_rating = Review.objects.filter(service=obj).aggregate(avg_rating=Avg('rating'))['avg_rating']
        return round(avg_rating, 1) if avg_rating is not None else 0.0  # Ensures 1 decimal place

    def get_total_reviews(self, obj):
        """Returns the total number of reviews for the service"""
        return Review.objects.filter(service=obj).count()

    def get_reviews(self, obj):
        """Fetches all reviews related to the service"""
        reviews = Review.objects.filter(service=obj)
        return ReviewSerializer(reviews, many=True).data 
    
    
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)  # Fetch username

    class Meta:
        model = Review
        fields = '__all__' 