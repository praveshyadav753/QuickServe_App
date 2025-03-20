# urls.py
from django.urls import path
from .views import ServicesAPIView,ServiceDetailView

urlpatterns = [
       path('services/',ServicesAPIView.as_view(),name=''),
       path('services/servicedetail/<int:service_id>/',ServiceDetailView.as_view(),name='')

    
]