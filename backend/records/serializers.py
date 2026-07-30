from rest_framework import serializers
from .models import PregnancyRecord

class PregnancyRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PregnancyRecord
        fields = '__all__'
        read_only_fields = ('mother', 'created_at', 'updated_at')
