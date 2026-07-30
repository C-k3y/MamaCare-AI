from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PregnancyRecord
from .serializers import PregnancyRecordSerializer
from users.permissions import IsMother, IsDoctor

class PregnancyRecordViewSet(viewsets.ModelViewSet):
    serializer_class = PregnancyRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'mother':
            # Mother can only see her own records
            return PregnancyRecord.objects.filter(mother=user)
        elif user.role == 'doctor' and hasattr(user, 'doctor_profile') and user.doctor_profile.is_verified:
            # Verified doctors can see active records of their patients 
            # (Currently returning all for simplicity, will be restricted by patient assignment later)
            return PregnancyRecord.objects.all()
        return PregnancyRecord.objects.none()

    def perform_create(self, serializer):
        # A mother can create her own record. 
        # Alternatively, a doctor might create it for her (requires additional logic).
        # We default to assigning the record to the currently logged in mother.
        serializer.save(mother=self.request.user)
