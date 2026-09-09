from django.db import models
from users.models import User

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    TYPE_CHOICES = (
        ('in_person', 'In Person'),
        ('video', 'Video Consultation'),
    )
    
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mother_appointments', limit_choices_to={'role': 'mother'})
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_appointments', limit_choices_to={'role': 'doctor'}, null=True, blank=True)
    date_time = models.DateTimeField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='in_person')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    reason = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.mother.email} - {self.date_time}"
