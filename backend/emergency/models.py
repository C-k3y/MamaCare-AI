from django.db import models
from users.models import User

class EmergencyContact(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emergency_contacts')
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    relationship = models.CharField(max_length=100)
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.phone_number}"

class EmergencyEvent(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emergency_events')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    status = models.CharField(max_length=50, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Emergency for {self.mother.email} at {self.created_at}"
