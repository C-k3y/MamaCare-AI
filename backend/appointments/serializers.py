from rest_framework import serializers
from .models import Appointment
from users.models import User

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']

class AppointmentSerializer(serializers.ModelSerializer):
    mother_details = UserBasicSerializer(source='mother', read_only=True)
    doctor_details = UserBasicSerializer(source='doctor', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['mother', 'created_at', 'updated_at']
