from django.urls import path
from .import views

urlpatterns = [
    # path('',views.HomeChatbot.as_view(),name='home')
    path('',views.HomeChatbot,name='home')
]
