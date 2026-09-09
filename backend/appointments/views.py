from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer
from django.utils import timezone

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'mother':
            return Appointment.objects.filter(mother=user).order_by('date_time')
        elif user.role == 'doctor':
            return Appointment.objects.filter(doctor=user).order_by('date_time')
        return Appointment.objects.none()

    def perform_create(self, serializer):
        serializer.save(mother=self.request.user)

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        now = timezone.now()
        upcoming_appointments = self.get_queryset().filter(date_time__gte=now, status='scheduled')
        serializer = self.get_serializer(upcoming_appointments, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def history(self, request):
        now = timezone.now()
        history_appointments = self.get_queryset().filter(date_time__lt=now)
        serializer = self.get_serializer(history_appointments, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def book(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post', 'put', 'patch'])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        appointment.status = 'cancelled'
        appointment.save()
        return Response({'status': 'appointment cancelled'})
