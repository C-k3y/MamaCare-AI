from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PregnancyRecordViewSet

router = DefaultRouter()
router.register(r'pregnancies', PregnancyRecordViewSet, basename='pregnancy-record')

urlpatterns = [
    path('', include(router.urls)),
]
