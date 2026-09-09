from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MealPlan, NutritionLog, WaterLog
from .serializers import MealPlanSerializer, NutritionLogSerializer, WaterLogSerializer

class MealPlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # We can add filtering by trimester later
        return super().get_queryset()

    @action(detail=False, methods=['post'])
    def generate(self, request):
        # Mock AI generation
        preferences = request.data.get('preferences', '')
        plan = MealPlan.objects.create(
            title=f"Custom Plan - {preferences}",
            description="Breakfast: Oatmeal\nLunch: Salad\nDinner: Grilled Chicken",
            trimester=1
        )
        serializer = self.get_serializer(plan)
        return Response(serializer.data)

class NutritionLogViewSet(viewsets.ModelViewSet):
    serializer_class = NutritionLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NutritionLog.objects.filter(mother=self.request.user).order_by('-logged_at')

    def perform_create(self, serializer):
        serializer.save(mother=self.request.user)

class WaterLogViewSet(viewsets.ModelViewSet):
    serializer_class = WaterLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WaterLog.objects.filter(mother=self.request.user).order_by('-logged_at')

    def perform_create(self, serializer):
        serializer.save(mother=self.request.user)
