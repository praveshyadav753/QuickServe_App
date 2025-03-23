from django.contrib import admin
from .models import Service, Business
from django.contrib.auth import get_user_model
from django.db.models import Count

User = get_user_model()  # Get the custom User model

class BusinessAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'get_user_email', 'service_count', 'created_at')  # Added service_count
    list_filter = ('user','business_name')  
    search_fields = ('business_name', 'user__email')  

    def get_user_email(self, obj):
        """Retrieve email from the related user model."""
        return obj.user.email if obj.user else "No User Assigned"
    get_user_email.short_description = 'Owner Email'  

    def service_count(self, obj):
        """Count the number of services for each business."""
        return obj.service_set.count()
    service_count.short_description = 'Service'

admin.site.register(Business, BusinessAdmin)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('service_name', 'business', 'price')  
    list_filter = ('business',)  
    search_fields = ('service_name', 'business__business_name')  
