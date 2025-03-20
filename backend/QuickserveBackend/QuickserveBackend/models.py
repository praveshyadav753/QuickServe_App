from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Service Provider', 'Service Provider'),
        ('Customer', 'Customer')
    ]

    user_id = models.AutoField(primary_key=True)
    mobile = models.CharField(max_length=15)
    email = models.EmailField(unique=True)  # ✅ Unique email
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # ✅ Allow `username` to be NULL since we're using email as the primary field
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)

    groups = models.ManyToManyField(Group, related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)

    # ✅ This tells Django to use `email` instead of `username` for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'mobile', 'role']

    def __str__(self):
        return self.email
