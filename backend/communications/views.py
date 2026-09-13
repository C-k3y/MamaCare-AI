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
        free_text = request.data.get('message', '')
        if not free_text:
            return Response({'error': 'Message is required'}, status=400)
            
        # Save user message
        user_msg = Message.objects.create(sender=request.user, receiver=request.user, content=free_text, is_ai=False)
        
        # Trigger Celery Task
        from ai_services.tasks import process_symptom_check
        process_symptom_check.delay(user_msg.id, free_text)
        
        return Response({
            'status': 'pending', 
            'message': 'Your symptoms are being analyzed by our AI.'
        })
