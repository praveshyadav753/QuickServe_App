from django.urls import path
from .views import Adminstats,BusinessListAPIView,ServiceRequestView

urlpatterns = [
    # path('login/', login_view, name='login')
    # path('refresh/', refresh_token_view, name='token_refresh'),
    path('stats/',Adminstats.as_view(),name=''),
    path('manage/business/',BusinessListAPIView.as_view(),name=''),
    path("service-requests/", ServiceRequestView.as_view(), name="service_requests"),

]
