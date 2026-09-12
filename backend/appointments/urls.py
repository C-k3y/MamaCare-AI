from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, DoctorAvailabilityViewSet, MedicationReminderViewSet

router = DefaultRouter()
router.register(r'availability', DoctorAvailabilityViewSet, basename='doctor-availability')
router.register(r'medications', MedicationReminderViewSet, basename='medication-reminder')
# Handles /api/appointments/
router.register(r'', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
]
