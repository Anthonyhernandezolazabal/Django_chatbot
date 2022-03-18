from django.urls import path
from .import views
from chatbot_admin.views import LoginFormViews
urlpatterns = [
    path('',LoginFormViews.as_view(),name='login'),
    path('getnombre/', views.getnombre, name='nombre'),
    path('getchat/', views.getchat, name='chat'),
    path('getjson/', views.getjson, name='getjson'),
    path('historial_fecha/',views.historialChatApiView.as_view(), name='historial_fecha'),
    path('obtener_conversacion/',views.conversacionesApiView.as_view(), name='obtener_conversacion'),
    path('personalizar_chat/',views.personalizarApiView.as_view(), name='personalizar_chat'),
    path('personalizar_edit/', views.personalizar_edit, name='personalizar_edit'),
]
