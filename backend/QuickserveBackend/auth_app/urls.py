from django.urls import path
from .views import login_view

urlpatterns = [
    path('login/', login_view, name='login'),
    # path('refresh/', refresh_token_view, name='token_refresh'),
]
