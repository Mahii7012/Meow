# --- File: core/serializers.py ---
# This file defines serializers to convert Django models to JSON for the API.

from rest_framework import serializers
from .models import User, DoctorProfile, PharmacyProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'registration_status']

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = DoctorProfile
        fields = '__all__'

class PharmacyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = PharmacyProfile
        fields = '__all__'
