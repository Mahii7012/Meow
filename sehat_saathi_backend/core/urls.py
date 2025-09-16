# --- File: core/urls.py ---
# This file handles the URL routing for the app API.

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserLogin, DoctorViewSet, PharmacyViewSet, UserViewSet, InventoryViewSet

# The DefaultRouter automatically creates API routes for our ViewSets.
router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'pharmacies', PharmacyViewSet)
router.register(r'users', UserViewSet)
router.register(r'inventory', InventoryViewSet, basename='inventory')


urlpatterns = [
    path('login/', UserLogin.as_view(), name='api_login'),
    path('', include(router.urls)),
]
