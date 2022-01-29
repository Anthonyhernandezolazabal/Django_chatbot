from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('chatbot.urls')),
    path('chatbot_admin/',include('chatbot_admin.urls')),
]
