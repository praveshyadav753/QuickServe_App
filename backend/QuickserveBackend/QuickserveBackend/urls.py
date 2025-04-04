"""
URL configuration for QuickserveBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse


urlpatterns = [

    path("", lambda request: HttpResponse(""), name="home"),  # Empty response

    path('admin/', admin.site.urls),  # Django admin URL
    path('core/', include('core.urls')), 
    path('service/',include('services.urls')),
    path('auth/',include('auth_app.urls')),
    path('cart/',include('cart.urls')),
    path('booking/',include('Booking_app.urls')),
        path('reviews/',include('reviews.urls')),
        path('business/',include('business.urls')),
        path('adminpanel/',include('adminpanel.urls')),


]