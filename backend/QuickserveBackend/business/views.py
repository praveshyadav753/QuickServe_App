from django.shortcuts import render
from http import HttpResponse
from django.http import JsonResponse
from .models import Category 
from rest_framework.decorators import api_view

# Create your views here.
from rest_framework import viewsets
from .models import Category, SubCategory, Service
from .serializers import CategorySerializer, SubCategorySerializer, ServiceSerializer



# class ServiceViewSet(viewsets.ModelViewSet):
#     queryset = Service.objects.all()
#     serializer_class = ServiceSerializer
