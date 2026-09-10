from django.db import models
from records.models import VitalsRecord
import uuid

class RiskAssessment(models.Model):
    RISK_LEVEL_CHOICES = (
        ('low', 'Low Risk'),
        ('medium', 'Medium Risk'),
        ('high', 'High Risk'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vitals_record = models.OneToOneField(VitalsRecord, on_delete=models.CASCADE, related_name='risk_assessment')
    
    risk_level = models.CharField(max_length=20, choices=RISK_LEVEL_CHOICES, default='low')
    risk_score = models.FloatField(help_text="Probability of risk (0.0 to 1.0)")
    
    # Store JSON of contributing factors (e.g. {'blood_pressure_systolic': 160, 'contribution': 0.45})
    contributing_factors = models.JSONField(default=dict, blank=True)
    
    model_version = models.CharField(max_length=50, default='v1.0.0', help_text="Version of the ML model used for this assessment")
    
    # If the doctor wants to manually override or confirm the risk
    reviewed_by_doctor = models.BooleanField(default=False)
    doctor_notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.risk_level.upper()} Risk for {self.vitals_record.pregnancy.mother.email} on {self.created_at}"
    
    class Meta:
        ordering = ['-created_at']
