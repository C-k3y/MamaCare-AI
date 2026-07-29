from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('mother', 'Mother'),
        ('doctor', 'Doctor'),
        ('admin', 'Admin'),
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='mother')
    email = models.EmailField(unique=True)

    # Use email for authentication instead of username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'role']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    @property
    def is_mother(self):
        return self.role == 'mother'

    @property
    def is_doctor(self):
        return self.role == 'doctor'

    @property
    def is_platform_admin(self):
        return self.role == 'admin'
