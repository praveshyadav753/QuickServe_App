from django.urls import path
from .views import SyncCartView, UserCartView

urlpatterns = [
    path('sync/', SyncCartView.as_view(), name='cart-sync'),
    path('get/', UserCartView.as_view(), name='user-cart'),  # No need to pass user_id in URL
]
