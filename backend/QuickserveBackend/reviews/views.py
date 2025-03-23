from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer

class UserBusinessReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(service__business__user=user)
