from django.urls import path
from .import views
from chatbot_admin.views import LoginFormViews

urlpatterns = [
    # path('',views.HomeChatbot.as_view(),name='home')
    # path('',views.HomeChatbot,name='home'),
    path('',LoginFormViews.as_view(),name='login'),
    path('getnombre/', views.getnombre, name='nombre'),
    path('getchat/', views.getchat, name='chat'),
    path('getjson/', views.getjson, name='rptajson'),
    path('entrenar_chatbot/', views.entrenar_chatbot, name='entrenar_chatbot'),

    path('historial_fecha/',views.historialChatApiView.as_view(), name='historial_fecha')
]
