# --- File: sehat_saathi/urls.py ---
# This file handles the main URL routing for the project.

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
