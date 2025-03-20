from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin URL
    path('insert/', include('core.urls')),  # Include app-specific URLs under 'insert/'
]