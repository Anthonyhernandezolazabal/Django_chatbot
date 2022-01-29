from django.urls import path
from .import views

urlpatterns = [
    # path('',views.HomeChatbot.as_view(),name='home')
    
    path('',views.HomeChatbot,name='home'),
    path('getnombre/', views.getnombre, name='nombre'),
    path('getchat/', views.getchat, name='chat'),
]
