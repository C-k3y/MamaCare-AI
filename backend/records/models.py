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
