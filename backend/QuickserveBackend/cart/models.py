from django.db import models
from django.contrib.auth import get_user_model
from business.models import Service

User = get_user_model()  # Corrected

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)  # Changed from 'product' to 'service'
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} x {self.service.name} for {self.user.username}"  # Fixed attribute reference
