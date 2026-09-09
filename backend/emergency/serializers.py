from rest_framework import serializers
from .models import EmergencyContact, EmergencyEvent

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = '__all__'
        read_only_fields = ['mother']

class EmergencyEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyEvent
        fields = '__all__'
        read_only_fields = ['mother', 'created_at']
