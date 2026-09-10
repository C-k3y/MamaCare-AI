from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RiskAssessmentViewSet

router = DefaultRouter()
router.register(r'risks', RiskAssessmentViewSet, basename='risk-assessment')

urlpatterns = [
    path('', include(router.urls)),
]
