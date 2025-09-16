# --- File: core/admin.py ---
# This file registers your models with the Django admin site.

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, DoctorProfile, PharmacyProfile

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('role', 'is_active_pharmacy', 'registration_status')}),
    )
    list_display = ('username', 'email', 'role', 'is_active_pharmacy', 'registration_status', 'is_staff')
    list_filter = ('role', 'is_active_pharmacy', 'registration_status')

admin.site.register(DoctorProfile)
admin.site.register(PharmacyProfile)

