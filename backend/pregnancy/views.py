from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import PregnancyTracker, SymptomLog, Milestone
from .serializers import PregnancyTrackerSerializer, SymptomLogSerializer, MilestoneSerializer

class PregnancyTrackerViewSet(viewsets.ModelViewSet):
    serializer_class = PregnancyTrackerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PregnancyTracker.objects.filter(mother=self.request.user)

    def perform_create(self, serializer):
        serializer.save(mother=self.request.user)
        
    def list(self, request, *args, **kwargs):
        # Frontend expects a single object for tracker, not a list usually
        instance, created = PregnancyTracker.objects.get_or_create(mother=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class SymptomLogViewSet(viewsets.ModelViewSet):
    serializer_class = SymptomLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SymptomLog.objects.filter(mother=self.request.user).order_by('-logged_at')

    def perform_create(self, serializer):
        # Basic mock AI assessment
        symptoms = serializer.validated_data.get('symptoms', [])
        ai_assessment = "Monitor your symptoms closely. If pain persists, consult your doctor."
        if 'bleeding' in symptoms or 'severe pain' in symptoms:
            ai_assessment = "URGENT: Please contact your doctor or go to the emergency room immediately."
        serializer.save(mother=self.request.user, ai_assessment=ai_assessment)

class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Milestone.objects.all().order_by('week')
    serializer_class = MilestoneSerializer
    permission_classes = [permissions.IsAuthenticated]
