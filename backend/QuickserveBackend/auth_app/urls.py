from django.urls import path
from .views import login_view
from .registerViews import BusinessRegistrationView,CustomerRegistrationView

urlpatterns = [
    path('login/', login_view, name='login'),
    # path('refresh/', refresh_token_view, name='token_refresh'),
    path('register/business/',BusinessRegistrationView.as_view(),name=''),
    path('register/customer/',CustomerRegistrationView.as_view(),name=''),
]
