from django.db import models
from users.models import User

class PregnancyTracker(models.Model):
    mother = models.OneToOneField(User, on_delete=models.CASCADE, related_name='pregnancy_tracker')
    due_date = models.DateField(null=True, blank=True)
    last_period_date = models.DateField(null=True, blank=True)
    current_week = models.IntegerField(default=1)
    
    def __str__(self):
        return f"{self.mother.email} - Week {self.current_week}"

class SymptomLog(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='symptom_logs')
    symptoms = models.JSONField(default=list)
    severity = models.CharField(max_length=50, blank=True)
    ai_assessment = models.TextField(blank=True)
    logged_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mother.email} - {self.logged_at}"

class Milestone(models.Model):
    week = models.IntegerField(unique=True)
    baby_size = models.CharField(max_length=255)
    description = models.TextField()
    mother_changes = models.TextField()

    def __str__(self):
        return f"Week {self.week} - {self.baby_size}"
