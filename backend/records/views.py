from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PregnancyRecord, VitalsRecord, MedicalDocument
from .serializers import PregnancyRecordSerializer, VitalsRecordSerializer, MedicalDocumentSerializer
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

class VitalsRecordViewSet(viewsets.ModelViewSet):
    serializer_class = VitalsRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'mother':
            return VitalsRecord.objects.filter(pregnancy__mother=user)
        elif user.role in ['doctor', 'chw']:
            return VitalsRecord.objects.all()
        return VitalsRecord.objects.none()

    def perform_create(self, serializer):
        serializer.save(recorded_by=self.request.user)

class MedicalDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalDocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'mother':
            return MedicalDocument.objects.filter(pregnancy__mother=user)
        elif user.role in ['doctor', 'chw']:
            return MedicalDocument.objects.all()
        return MedicalDocument.objects.none()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
