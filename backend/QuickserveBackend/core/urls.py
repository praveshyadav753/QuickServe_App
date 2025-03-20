# urls.py
from django.urls import path
from .views import CategoryAPIView,SubCategoryView

urlpatterns = [
    path('categories-get/', CategoryAPIView.as_view(), name=''),
    path('subcategory/<str:category_id>/',SubCategoryView.as_view(),name=''),
    
] 