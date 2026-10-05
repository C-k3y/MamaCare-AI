from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer, UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        
        # Generate tokens for the newly registered user
        refresh = RefreshToken.for_user(user)
        refresh['role'] = user.role
        refresh['email'] = user.email
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save()


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        return self.request.user


from .models import MotherProfile, DoctorProfile
from .serializers import MotherProfileSerializer, DoctorProfileSerializer

class MotherProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = MotherProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.mother_profile


class DoctorProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.doctor_profile

from .models import CHWProfile
from .serializers import CHWProfileSerializer

class CHWProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CHWProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.chw_profile


from .permissions import IsAdmin

class PendingDoctorsListView(generics.ListAPIView):
    """
    List all doctors that have not been verified yet.
    """
    serializer_class = DoctorProfileSerializer
    permission_classes = (IsAdmin,)

    def get_queryset(self):
        return DoctorProfile.objects.filter(is_verified=False)


class VerifyDoctorView(APIView):
    """
    Approve a doctor by setting is_verified = True.
    """
    permission_classes = (IsAdmin,)

    def post(self, request, pk):
        try:
            doctor_profile = DoctorProfile.objects.get(pk=pk)
            doctor_profile.is_verified = True
            doctor_profile.save()
            return Response(
                {"detail": f"Doctor {doctor_profile.user.email} has been verified successfully."},
                status=status.HTTP_200_OK
            )
        except DoctorProfile.DoesNotExist:
            return Response(
                {"detail": "Doctor profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

from .serializers import ResetPasswordEmailRequestSerializer, SetNewPasswordSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes, force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util

class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            absurl = 'http://' + current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your password'}
            Util.send_email(data)
        
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as e:
            return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = (AllowAny,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

from appointments.models import Appointment
from emergency.models import EmergencyEvent
from records.models import PregnancyRecord, VitalsRecord
from django.utils import timezone
from datetime import timedelta

class AdminAnalyticsView(APIView):
    """
    Returns aggregated stats for the Admin Dashboard (Provider Dashboard UI).
    """
    permission_classes = (IsAdmin,)

    def get(self, request):
        today = timezone.now().date()
        
        # Base Stats
        total_patients = User.objects.filter(role='mother').count()
        today_appointments_qs = Appointment.objects.filter(date_time__date=today).order_by('date_time')
        todays_appointments_count = today_appointments_qs.count()
        todays_patients = today_appointments_qs.values('mother').distinct().count()
        
        # Patient Summary (Mocking High Risk/New based on created_at)
        new_patients = User.objects.filter(role='mother', date_joined__gte=today - timedelta(days=30)).count()
        # A simple high risk mockup: anyone with an SOS or recent abnormal vitals (for now we hardcode 10% or calculate)
        high_risk_patients = max(1, int(total_patients * 0.1)) 
        patient_summary = {
            'total': total_patients,
            'new': new_patients,
            'high_risk': high_risk_patients
        }

        # Today's Appointments List
        todays_appointments_data = []
        for appt in today_appointments_qs[:5]:
            todays_appointments_data.append({
                'name': appt.mother.get_full_name() or appt.mother.username or appt.mother.email.split('@')[0],
                'cond': appt.type,
                'time': appt.date_time.strftime("%I:%M %p")
            })

        # Next Patient Details
        next_patient = None
        next_appt = today_appointments_qs.filter(date_time__gte=timezone.now(), status='scheduled').first()
        if next_appt:
            mother = next_appt.mother
            preg_record = PregnancyRecord.objects.filter(mother=mother).first()
            last_vitals = VitalsRecord.objects.filter(pregnancy=preg_record).first() if preg_record else None
            
            # Extract basic details
            weight = f"{last_vitals.weight_kg} kg" if last_vitals and last_vitals.weight_kg else "--"
            # Note: We don't have height in the models, mocking it.
            
            next_patient = {
                'name': mother.get_full_name() or mother.username or mother.email.split('@')[0],
                'id': f"#PT-{mother.id}",
                'sex': 'Female',
                'age': '28y',  # Would come from MotherProfile.date_of_birth
                'weight': weight,
                'height': '165 cm',
                'last_visit': 'Nov 14', # Mock for now
                'registered': mother.date_joined.strftime("%b %d"),
                'conditions': ['High BP'] if last_vitals and last_vitals.blood_pressure_systolic and last_vitals.blood_pressure_systolic > 140 else []
            }

        # Risk Overview (Mocked logic for now, ideally calculated from AI models or Vitals)
        risk_overview = [
            {'label': 'Low Risk', 'pct': 65, 'color': '#10b981'},
            {'label': 'Moderate Risk', 'pct': 20, 'color': '#f59e0b'},
            {'label': 'High Risk', 'pct': 10, 'color': '#d97706'},
            {'label': 'Critical', 'pct': 5, 'color': '#b91c1c'}
        ]

        # Appointment Requests
        pending_qs = Appointment.objects.filter(status='scheduled', date_time__gte=timezone.now()).order_by('date_time')
        appointment_requests = []
        for req in pending_qs[:3]:
             appointment_requests.append({
                 'name': req.mother.get_full_name() or req.mother.username or req.mother.email.split('@')[0],
                 'cond': req.type
             })

        return Response({
            'total_patients': total_patients,
            'todays_patients': todays_patients,
            'todays_appointments_count': todays_appointments_count,
            'patient_summary': patient_summary,
            'todays_appointments': todays_appointments_data,
            'next_patient': next_patient,
            'risk_overview': risk_overview,
            'appointment_requests': appointment_requests
        }, status=status.HTTP_200_OK)
