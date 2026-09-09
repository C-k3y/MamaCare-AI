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
        # Save user message
        msg_text = f"I have the following symptoms: {', '.join(symptoms)}"
        Message.objects.create(sender=request.user, content=msg_text, is_ai=True)
        
        # Mock AI response
        ai_response = "Based on your symptoms, I recommend resting and drinking plenty of fluids."
        if 'bleeding' in symptoms:
            ai_response = "Please contact your doctor immediately."
            
        ai_msg = Message.objects.create(receiver=request.user, sender=request.user, content=ai_response, is_ai=True, is_read=False)
        return Response({'assessment': ai_response})
