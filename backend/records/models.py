from django.db import models
from django.contrib.auth import get_user_model
from mirage import fields as mirage_fields

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
    
    # Medical history or previous complications - HIPAA/GDPR Encrypted Field
    medical_history = mirage_fields.EncryptedTextField(blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    from datetime import date
    @property
    def gestational_age_weeks(self):
        if self.lmp:
            delta = date.today() - self.lmp
            return delta.days // 7
        return None

    @property
    def trimester(self):
        weeks = self.gestational_age_weeks
        if weeks is None:
            return None
        if weeks < 13:
            return 1
        elif weeks < 27:
            return 2
        else:
            return 3

    def __str__(self):
        return f"Pregnancy Record for {self.mother.email} (EDD: {self.edd})"

    class Meta:
        ordering = ['-created_at']

from django.core.validators import MinValueValidator, MaxValueValidator

class VitalsRecord(models.Model):
    pregnancy = models.ForeignKey(PregnancyRecord, on_delete=models.CASCADE, related_name='vitals')
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='recorded_vitals')
    
    blood_pressure_systolic = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(70), MaxValueValidator(250)]
    )
    blood_pressure_diastolic = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(40), MaxValueValidator(150)]
    )
    weight_kg = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True,
        validators=[MinValueValidator(30.0), MaxValueValidator(300.0)]
    )
    blood_glucose_mg_dl = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(40), MaxValueValidator(600)]
    )
    fetal_movement_count = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    notes = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Vitals for {self.pregnancy.mother.email} at {self.timestamp}"
        
    class Meta:
        ordering = ['-timestamp']



class MedicalDocument(models.Model):
    DOCUMENT_TYPES = (
        ('lab_result', 'Lab Result'),
        ('ultrasound', 'Ultrasound Scan'),
        ('prescription', 'Prescription'),
        ('general', 'General Document'),
    )
    
    pregnancy = models.ForeignKey(PregnancyRecord, on_delete=models.CASCADE, related_name='documents')
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_documents')
    title = models.CharField(max_length=255)
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES, default='general')
    
    # Stores the file in AWS S3 (via django-storages if configured, otherwise local media/)
    file = models.FileField(upload_to='ehr_documents/%Y/%m/')
    
    notes = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} for {self.pregnancy.mother.email}"
        
    class Meta:
        ordering = ['-uploaded_at']

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
