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


class MotherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mother_profile')
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    emergency_contact_name = models.CharField(max_length=255, blank=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True)
    blood_group = models.CharField(max_length=5, blank=True)

    def __str__(self):
        return f"Mother Profile: {self.user.email}"


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    phone_number = models.CharField(max_length=20, blank=True)
    specialization = models.CharField(max_length=255, blank=True)
    medical_license_number = models.CharField(max_length=255, blank=True, unique=True, null=True)
    hospital_affiliation = models.CharField(max_length=255, blank=True)
    years_of_experience = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Doctor Profile: {self.user.email}"
