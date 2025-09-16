# --- File: core/models.py ---
# This file defines your custom User model and related models.

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    A custom user model with roles for the Sehat Saathi app.
    """
    GOV_ADMIN = 'GOV_ADMIN'
    PHARMACY = 'PHARMACY'
    PATIENT = 'PATIENT' # Additional role for patients

    ROLE_CHOICES = (
        (GOV_ADMIN, 'Government Admin'),
        (PHARMACY, 'Pharmacy'),
        (PATIENT, 'Patient'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=PATIENT)
    is_active_pharmacy = models.BooleanField(default=False)
    registration_status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')

class DoctorProfile(models.Model):
    """
    Profile for a doctor, linked to a User.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialty = models.CharField(max_length=100)
    registration_id = models.CharField(max_length=50)
    clinic_hospital = models.CharField(max_length=255)
    region = models.CharField(max_length=100)
    # Mock fields for profile panel
    credentials = models.CharField(max_length=255, blank=True, null=True)
    contact_info = models.CharField(max_length=100, blank=True, null=True)
    practice_address = models.CharField(max_length=255, blank=True, null=True)
    experience = models.IntegerField(default=0)
    patient_ratings = models.FloatField(default=0.0)
    certificates = models.JSONField(default=list) # Mock for download links

class PharmacyProfile(models.Model):
    """
    Profile for a pharmacy, linked to a User.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='pharmacy_profile')
    owner_name = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    people_catered = models.IntegerField(default=0)
    stock_value = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    # Mock for products and orders
    products = models.JSONField(default=list)
    orders = models.JSONField(default=list)
