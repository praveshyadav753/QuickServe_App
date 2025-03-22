from django.urls import path
from .views import login_view
from .registerViews import BusinessRegistrationView,CustomerRegistrationView

urlpatterns = [
    path('mybooking/', name='login'),
    # path('register/business/',BusinessRegistrationView.as_view(),name=''),
    # path('register/customer/',CustomerRegistrationView.as_view(),name=''),
]
