from django.urls import path,include
from .import views
from chatbot_admin.views import LoginFormViews
from chatbot.views import mod_slider,obtener_prg,r_exportar
from rest_framework import routers

urlpatterns = [
    path('',LoginFormViews.as_view(),name='login'),
    path('getnombre/', views.getnombre, name='nombre'),
    path('getchat/', views.getchat, name='chat'),
    path('getjson/', views.getjson, name='getjson'),
    path('getjsondelet/', views.getjsondelet, name='getjsondelet'),
    path('historial_fecha/',views.historialChatApiView.as_view(), name='historial_fecha'),
    path('obtener_conversacion/',views.conversacionesApiView.as_view(), name='obtener_conversacion'),
    path('personalizar_chat/',views.personalizarApiView.as_view(), name='personalizar_chat'),
    path('delete___chat/', views.delete___chat, name='chatdeleted'),
    path('all_chat_ver/', views.all_chat_ver, name='all_chat_ver'),
    path('visto__chat/', views.visto__chat, name='visto__chat'),
    path('data__set/',views.data__set_all.as_view(), name='data__set'),
    path('personalizar_edit/', views.personalizar_edit, name='personalizar_edit'),
    path('get_prg/',obtener_prg.getprg,name='get_prg'),
    path('guardar_img_slider/', mod_slider.guardar_imagen_slider,name='guardar_img_slider'),
    path('guardar_logo_chatbot/', mod_slider.guardarlogochatbot,name='guardar_logo_chatbot'),
    path('export_csv/',r_exportar.export_csv,name='export_csv'),
    # path('export_excel/',r_exportar.export_excel,name='export_excel'),

    # path('api/',include(router.urls))
    # path('api/', include('api.urls')),

]