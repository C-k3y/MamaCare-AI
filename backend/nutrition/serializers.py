from rest_framework import serializers
from .models import MealPlan, NutritionLog, WaterLog

class MealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlan
        fields = '__all__'

class NutritionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionLog
        fields = '__all__'
        read_only_fields = ['mother', 'logged_at']

class WaterLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterLog
        fields = '__all__'
        read_only_fields = ['mother', 'logged_at']
