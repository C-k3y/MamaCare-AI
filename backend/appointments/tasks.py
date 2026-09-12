from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import Appointment, MedicationReminder
from communications.models import Message

@shared_task
def send_appointment_reminders():
    """
    Runs periodically (e.g., every hour via Celery Beat).
    Sends a reminder for appointments happening in the next 24 hours.
    """
    now = timezone.now()
    tomorrow = now + timedelta(days=1)
    
    # Find scheduled appointments happening exactly between now and tomorrow
    upcoming_appts = Appointment.objects.filter(
        status='scheduled',
        date_time__gte=now,
        date_time__lte=tomorrow
    )
    
    count = 0
    for appt in upcoming_appts:
        # Mock Notification - Create a Message
        # In reality, this checks if a reminder was already sent
        content = f"Reminder: You have an upcoming {appt.get_type_display().lower()} appointment on {appt.date_time.strftime('%b %d at %I:%M %p')}."
        Message.objects.create(
            sender=appt.doctor if appt.doctor else appt.mother, 
            receiver=appt.mother,
            content=content,
            is_ai=True
        )
        count += 1
        
    return f"Sent {count} appointment reminders."

@shared_task
def send_medication_reminders():
    """
    Runs periodically (e.g., every 15 minutes).
    Checks active MedicationReminders and notifies mothers if it's time to take their meds.
    """
    now_time = timezone.localtime().time()
    
    reminders = MedicationReminder.objects.filter(is_active=True)
    count = 0
    
    for rm in reminders:
        # If the reminder time is within the current 15 min window
        time_diff = (rm.time_of_day.hour * 60 + rm.time_of_day.minute) - (now_time.hour * 60 + now_time.minute)
        
        if 0 <= time_diff < 15:
            content = f"Medication Reminder: Time to take {rm.dosage} of {rm.medication_name}."
            Message.objects.create(
                sender=rm.mother, # System generated
                receiver=rm.mother,
                content=content,
                is_ai=True
            )
            count += 1
            
    return f"Sent {count} medication reminders."
