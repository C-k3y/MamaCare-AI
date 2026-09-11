from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(receiver=user) | Message.objects.filter(sender=user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    @action(detail=False, methods=['get'])
    def unread(self, request):
        qs = Message.objects.filter(receiver=request.user, is_read=False)
        return Response(self.get_serializer(qs, many=True).data)

    @action(detail=False, methods=['post'], url_path='symptom-check')
    def symptom_check(self, request):
        symptoms = request.data.get('symptoms', [])
        free_text = ', '.join(symptoms)
        
        # Save user message
        msg_text = f"I have the following symptoms: {free_text}"
        user_msg = Message.objects.create(sender=request.user, content=msg_text, is_ai=False)
        
        # Trigger Celery Task
        from ai_services.tasks import process_symptom_check
        process_symptom_check.delay(user_msg.id, free_text)
        
        # Return a pending state since the task is async
        return Response({'assessment': "Your symptoms are being analyzed by our AI. You will receive a message shortly with guidance.", 'status': 'pending'})
