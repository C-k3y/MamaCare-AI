from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PregnancyTrackerViewSet, SymptomLogViewSet, MilestoneViewSet

router = DefaultRouter()
router.register(r'symptoms', SymptomLogViewSet, basename='symptoms')
router.register(r'milestones', MilestoneViewSet, basename='milestones')

urlpatterns = [
    path('', include(router.urls)),
    path('tracker/', PregnancyTrackerViewSet.as_view({'get': 'list', 'post': 'create', 'put': 'update', 'patch': 'partial_update'}), name='tracker'),
]
