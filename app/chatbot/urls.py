from django.urls import path
from .import views
from chatbot_admin.views import LoginFormViews
from chatbot.views import mod_slider,obtener_prg
urlpatterns = [
    path('',LoginFormViews.as_view(),name='login'),
    path('getnombre/', views.getnombre, name='nombre'),
    path('getchat/', views.getchat, name='chat'),
    path('getjson/', views.getjson, name='getjson'),
    path('getjsondelet/', views.getjsondelet, name='getjsondelet'),
    path('historial_fecha/',views.historialChatApiView.as_view(), name='historial_fecha'),
    path('obtener_conversacion/',views.conversacionesApiView.as_view(), name='obtener_conversacion'),
    path('personalizar_chat/',views.personalizarApiView.as_view(), name='personalizar_chat'),
    
    path('data__set/',views.data__set_all.as_view(), name='data__set'),
    
    
    
    path('personalizar_edit/', views.personalizar_edit, name='personalizar_edit'),

    path('get_prg/',obtener_prg.getprg,name='get_prg'),

    path('guardar_img_slider/', mod_slider.guardar_imagen_slider,name='guardar_img_slider'),


]
