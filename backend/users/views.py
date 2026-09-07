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
