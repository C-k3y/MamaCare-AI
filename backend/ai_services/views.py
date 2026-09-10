from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import RiskAssessment
from .serializers import RiskAssessmentSerializer

class RiskAssessmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RiskAssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'mother':
            return RiskAssessment.objects.filter(vitals_record__pregnancy__mother=user)
        elif user.role in ['doctor', 'chw', 'admin']:
            return RiskAssessment.objects.all()
        return RiskAssessment.objects.none()

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def review(self, request, pk=None):
        if request.user.role != 'doctor':
            return Response({'detail': 'Only doctors can review risk assessments.'}, status=status.HTTP_403_FORBIDDEN)
            
        assessment = self.get_object()
        notes = request.data.get('doctor_notes', '')
        
        assessment.reviewed_by_doctor = True
        assessment.doctor_notes = notes
        assessment.save()
        
        return Response(self.get_serializer(assessment).data)
