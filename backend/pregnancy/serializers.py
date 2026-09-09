from rest_framework import serializers
from .models import PregnancyTracker, SymptomLog, Milestone

class PregnancyTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PregnancyTracker
        fields = '__all__'
        read_only_fields = ['mother']

class SymptomLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SymptomLog
        fields = '__all__'
        read_only_fields = ['mother', 'ai_assessment', 'logged_at']

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = '__all__'
