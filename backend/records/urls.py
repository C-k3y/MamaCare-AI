from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PregnancyRecordViewSet, VitalsRecordViewSet, MedicalDocumentViewSet

router = DefaultRouter()
router.register(r'pregnancies', PregnancyRecordViewSet, basename='pregnancy-record')
router.register(r'vitals', VitalsRecordViewSet, basename='vitals-record')
router.register(r'documents', MedicalDocumentViewSet, basename='medical-document')

urlpatterns = [
    path('', include(router.urls)),
]
