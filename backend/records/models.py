from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class PregnancyRecord(models.Model):
    mother = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pregnancy_records', limit_choices_to={'role': 'mother'})
    
    # Last Menstrual Period
    lmp = models.DateField(null=True, blank=True)
    # Estimated Date of Delivery
    edd = models.DateField(null=True, blank=True)
    
    # Number of times a woman has been pregnant
    gravida = models.PositiveIntegerField(default=1)
    # Number of pregnancies reaching viable gestational age
    para = models.PositiveIntegerField(default=0)
    
    # Medical history or previous complications
    medical_history = models.TextField(blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Pregnancy Record for {self.mother.email} (EDD: {self.edd})"

    class Meta:
        ordering = ['-created_at']

class AuditLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='audit_logs')
    action = models.CharField(max_length=255)
    module = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.user.email if self.user else 'System'} - {self.action} on {self.module} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']
