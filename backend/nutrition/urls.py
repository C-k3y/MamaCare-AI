from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MealPlanViewSet, NutritionLogViewSet, WaterLogViewSet

router = DefaultRouter()
router.register(r'meal-plans', MealPlanViewSet, basename='meal-plan')
router.register(r'log', NutritionLogViewSet, basename='nutrition-log')
router.register(r'water', WaterLogViewSet, basename='water-log')

urlpatterns = [
    path('', include(router.urls)),
]
