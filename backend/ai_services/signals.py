from django.db.models.signals import post_save
from django.dispatch import receiver
from records.models import VitalsRecord
from .tasks import process_risk_assessment

@receiver(post_save, sender=VitalsRecord)
def trigger_risk_assessment(sender, instance, created, **kwargs):
    """
    Auto-triggers the risk assessment Celery task whenever a new VitalLog entry is created.
    """
    if created:
        # Offload the ML inference to Celery
        process_risk_assessment.delay(instance.id)
