from django.db import models
from business.models import Service
from QuickserveBackend.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    rating = models.DecimalField(
        max_digits=3, decimal_places=1,  # Allows values like 4.5, 3.2
        validators=[MinValueValidator(1.0), MaxValueValidator(5.0)]
    )   
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"Review {self.review_id} - {self.service} by {self.user}"

