from rest_framework import serializers
from .models import RiskAssessment

class RiskAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskAssessment
        fields = '__all__'
        read_only_fields = ['id', 'vitals_record', 'risk_level', 'risk_score', 'contributing_factors', 'model_version', 'created_at']
