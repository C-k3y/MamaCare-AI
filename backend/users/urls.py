from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    LogoutView,
    UserProfileView,
    MotherProfileView,
    DoctorProfileView,
    CHWProfileView,
    PendingDoctorsListView,
    VerifyDoctorView,
    RequestPasswordResetEmail,
    PasswordTokenCheckAPI,
    SetNewPasswordAPIView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('profile/mother/', MotherProfileView.as_view(), name='mother_profile'),
    path('profile/doctor/', DoctorProfileView.as_view(), name='doctor_profile'),
    path('profile/chw/', CHWProfileView.as_view(), name='chw_profile'),
    
    # Password Reset
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),

    # Admin Doctor Verification Endpoints
    path('admin/doctors/pending/', PendingDoctorsListView.as_view(), name='pending_doctors'),
    path('admin/doctors/<int:pk>/verify/', VerifyDoctorView.as_view(), name='verify_doctor'),
]
