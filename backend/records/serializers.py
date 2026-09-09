from rest_framework import serializers
from .models import PregnancyRecord, VitalsRecord, MedicalDocument

class VitalsRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VitalsRecord
        fields = '__all__'
        read_only_fields = ['recorded_by']

class MedicalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalDocument
        fields = '__all__'
        read_only_fields = ['uploaded_by']

class PregnancyRecordSerializer(serializers.ModelSerializer):
    gestational_age_weeks = serializers.ReadOnlyField()
    trimester = serializers.ReadOnlyField()
    vitals = VitalsRecordSerializer(many=True, read_only=True)
    documents = MedicalDocumentSerializer(many=True, read_only=True)
    
    class Meta:
        model = PregnancyRecord
        fields = '__all__'
        read_only_fields = ['mother', 'created_at', 'updated_at']
