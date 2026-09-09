from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmergencyContactViewSet, EmergencyEventViewSet

router = DefaultRouter()
router.register(r'contacts', EmergencyContactViewSet, basename='emergency-contacts')
router.register(r'', EmergencyEventViewSet, basename='emergency-events')

urlpatterns = [
    path('', include(router.urls)),
]
