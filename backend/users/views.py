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
