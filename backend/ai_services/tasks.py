from celery import shared_task
from .models import RiskAssessment
from records.models import VitalsRecord
from .ml_service import RiskModelService

@shared_task
def process_risk_assessment(vitals_record_id):
    """
    Async Celery task to run the ML model inference and save the RiskAssessment.
    """
    try:
        vitals = VitalsRecord.objects.get(id=vitals_record_id)
    except VitalsRecord.DoesNotExist:
        return f"VitalsRecord {vitals_record_id} does not exist."

    # 1. Load ML Service (Singleton)
    ml_service = RiskModelService()
    
    # 2. Run Preprocessing & Inference
    risk_score, risk_level, factors = ml_service.predict_risk(vitals)
    
    # 3. Save to Database
    assessment, created = RiskAssessment.objects.update_or_create(
        vitals_record=vitals,
        defaults={
            'risk_level': risk_level,
            'risk_score': risk_score,
            'contributing_factors': factors,
            'model_version': 'v1.0.0-mock' if ml_service._model == "MOCK_MODEL" else 'v1.0.0-xgb'
        }
    )
    
    # 4. If High Risk, trigger Doctor Alert Notification
    if risk_level == 'high':
        send_high_risk_alert.delay(assessment.id)
        
    return f"Assessment completed for Vitals {vitals_record_id}: {risk_level.upper()}"

@shared_task
def send_high_risk_alert(assessment_id):
    """
    Sends an alert to the assigned doctor when a High Risk assessment is generated.
    """
    try:
        assessment = RiskAssessment.objects.get(id=assessment_id)
        # Mock logic: Create a Message or Notification for the doctor
        # In a real scenario, this would query the assigned doctor(s)
        # and send a Push Notification, SMS, or Email.
        print(f"ALERT: HIGH RISK DETECTED for {assessment.vitals_record.pregnancy.mother.email}. Notifying doctor...")
        
        # Example of creating a system message:
        from communications.models import Message
        from users.models import User
        
        # Find doctors (or the specifically assigned doctor)
        doctors = User.objects.filter(role='doctor')
        for doc in doctors:
            Message.objects.create(
                sender=assessment.vitals_record.pregnancy.mother, # System generated, but attached to mother
                receiver=doc,
                content=f"URGENT: High risk prediction for {assessment.vitals_record.pregnancy.mother.email}. Score: {assessment.risk_score:.2f}.",
                is_ai=True
            )
    except RiskAssessment.DoesNotExist:
        pass

@shared_task
def process_symptom_check(message_id, free_text):
    """
    Async Celery task to classify symptoms via Hugging Face/rules
    and save the AI response back to the Message model.
    """
    from communications.models import Message
    from .nlp_service import NLPService
    
    try:
        user_msg = Message.objects.get(id=message_id)
    except Message.DoesNotExist:
        return "Message not found"

    nlp = NLPService()
    urgency, ai_response = nlp.triage_symptoms(free_text)
    
    # Save the AI response back as a new message
    ai_msg = Message.objects.create(
        receiver=user_msg.sender,
        sender=user_msg.sender, # AI acts on behalf of the system to the user
        content=ai_response,
        is_ai=True,
        is_read=False
    )
    
    # Escalation flow for Emergency
    if urgency == 'Emergency':
        # Flag the original message as emergency (if such a field existed, or we can send an alert)
        print(f"ESCALATION: Emergency detected for user {user_msg.sender.email}")
        
    return urgency
