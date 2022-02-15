from django.urls import path
from .import views
from chatbot_admin.views import LoginFormViews
from django.contrib.auth.views import LogoutView
from django.contrib.auth.decorators import login_required
from chatbot_admin.views import modulo_conversacion,FormularioCliente,modulo_usuarios,modulo_clientes,modulo_historial_conversacion,modulo_apariencia
urlpatterns = [
    path('',LoginFormViews.as_view(),name='login'),
    path('logout/',LogoutView.as_view(next_page='login'), name='logout'),
    path('registro/',views.register_view,name='registro'),
    path('inicio/',login_required(views.Home),name='home'),
    path('test_chatbot/',login_required(views.test_chatbot),name='test_chatbot'),
    path('ir_registrar_empr/', FormularioCliente.ir_registrar_empresa, name='ir_registrar_empr' ),
    path('guardarCliente/', FormularioCliente.procesar_formulario, name='guardarCliente' ),
    path('respuestas/', login_required(modulo_conversacion.respuestas), name='respuestas'),
    path('registrar_rpta/', login_required(modulo_conversacion.registrar_rpta), name='registrar_rpta' ),
    path('usuarios/',login_required(modulo_usuarios.mod_usuario),name='usuarios' ),
    path('clientes/',login_required(modulo_clientes.mod_clientes),name='clientes' ),
    path('historial/',login_required(modulo_historial_conversacion.mod_historial), name='historial'),
    path('apariencia/',login_required(modulo_apariencia.mod_apariencia), name='apariencia'),
]