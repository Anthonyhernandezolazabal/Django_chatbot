from django.urls import path
from .import views

urlpatterns = [
    # path('',views.HomeChatbot.as_view(),name='home')
    path('',views.HomeChatbot,name='home'),
    path('getnombre/', views.getnombre, name='nombre'),
    path('getchat/', views.getchat, name='chat'),
    path('getjson/', views.getjson, name='rptajson'),
    path('entrenar_chatbot/', views.entrenar_chatbot, name='entrenar_chatbot'),
]
