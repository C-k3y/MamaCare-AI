from rest_framework import serializers
from .models import PregnancyRecord, VitalsRecord

class PregnancyRecordSerializer(serializers.ModelSerializer):
    gestational_age_weeks = serializers.ReadOnlyField()
    trimester = serializers.ReadOnlyField()

    class Meta:
        model = PregnancyRecord
        fields = '__all__'
        read_only_fields = ('mother', 'created_at', 'updated_at')

class VitalsRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VitalsRecord
        fields = '__all__'
        read_only_fields = ('recorded_by', 'timestamp')
