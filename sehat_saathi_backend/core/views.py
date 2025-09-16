# --- File: core/views.py ---
# This file defines the API views that handle requests.

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import User, DoctorProfile, PharmacyProfile
from .serializers import UserSerializer, DoctorProfileSerializer, PharmacyProfileSerializer

class UserLogin(ObtainAuthToken):
    """
    Handles user login and returns an authentication token.
    """
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'role': user.role
        })

class IsGovAdmin(permissions.BasePermission):
    """Custom permission to only allow government admins to access."""
    def has_permission(self, request, view):
        return request.user.role == User.GOV_ADMIN

class IsPharmacy(permissions.BasePermission):
    """Custom permission to only allow pharmacy users to access."""
    def has_permission(self, request, view):
        return request.user.role == User.PHARMACY

class DoctorViewSet(viewsets.ModelViewSet):
    """API for managing doctors (GOV_ADMIN role)."""
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsGovAdmin]

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        doctor_profile = self.get_object()
        doctor_profile.user.registration_status = 'Approved'
        doctor_profile.user.save()
        return Response({'status': 'doctor approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        doctor_profile = self.get_object()
        doctor_profile.user.registration_status = 'Rejected'
        doctor_profile.user.save()
        return Response({'status': 'doctor rejected'})

class PharmacyViewSet(viewsets.ModelViewSet):
    """API for managing pharmacies."""
    queryset = PharmacyProfile.objects.all()
    serializer_class = PharmacyProfileSerializer
    permission_classes = [permissions.IsAuthenticated] # Permissions will be handled by actions

class UserViewSet(viewsets.ModelViewSet):
    """API for general user management and stats."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsGovAdmin]

    def get_queryset(self):
        return User.objects.filter(role='PATIENT')

class InventoryViewSet(viewsets.ModelViewSet):
    """API for a pharmacy's inventory management."""
    queryset = PharmacyProfile.objects.all() # We'll handle filtering in a real implementation
    serializer_class = PharmacyProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsPharmacy]
    
    @action(detail=True, methods=['get', 'post', 'put', 'delete'])
    def products(self, request, pk=None):
        pharmacy_profile = self.get_object()
        if request.method == 'GET':
            return Response(pharmacy_profile.products)
        
        # This is a simplified mock for CRUD operations
        if request.method == 'POST':
            new_product = request.data
            new_product['id'] = str(uuid.uuid4())
            pharmacy_profile.products.append(new_product)
            pharmacy_profile.save()
            return Response(new_product, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

