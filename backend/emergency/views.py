from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import EmergencyContact, EmergencyEvent
from .serializers import EmergencyContactSerializer, EmergencyEventSerializer
from django.utils import timezone

class EmergencyContactViewSet(viewsets.ModelViewSet):
    serializer_class = EmergencyContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return EmergencyContact.objects.filter(mother=self.request.user)

    def perform_create(self, serializer):
        serializer.save(mother=self.request.user)

class EmergencyEventViewSet(viewsets.GenericViewSet):
    serializer_class = EmergencyEventSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def trigger(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save(mother=self.request.user)
        # Here we would normally trigger SMS, Push Notifications, etc.
        return Response({
            'message': 'Emergency alerts dispatched successfully',
            'event_id': event.id
        }, status=status.HTTP_201_CREATED)
