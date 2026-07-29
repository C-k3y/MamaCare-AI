from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import MotherProfile, DoctorProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'mother':
            MotherProfile.objects.create(user=instance)
        elif instance.role == 'doctor':
            DoctorProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.role == 'mother':
        if not hasattr(instance, 'mother_profile'):
            MotherProfile.objects.create(user=instance)
        instance.mother_profile.save()
    elif instance.role == 'doctor':
        if not hasattr(instance, 'doctor_profile'):
            DoctorProfile.objects.create(user=instance)
        instance.doctor_profile.save()
