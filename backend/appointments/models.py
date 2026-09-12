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

class DoctorAvailability(models.Model):
    DAY_CHOICES = (
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    )
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='availabilities', limit_choices_to={'role': 'doctor'})
    day_of_week = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('doctor', 'day_of_week', 'start_time')

    def __str__(self):
        return f"{self.doctor.email} - {self.get_day_of_week_display()} ({self.start_time} - {self.end_time})"

class MedicationReminder(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medication_reminders', limit_choices_to={'role': 'mother'})
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    time_of_day = models.TimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.medication_name} for {self.mother.email} at {self.time_of_day}"
