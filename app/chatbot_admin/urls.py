from django.urls import path
from .import views
from chatbot_admin.views import LoginFormViews
from django.contrib.auth.views import LogoutView
from django.contrib.auth.decorators import login_required
from chatbot_admin.views import modulo_conversacion,FormularioCliente,modulo_usuarios,modulo_clientes

urlpatterns = [

    path('',LoginFormViews.as_view(),name='login'),
    path('logout/',LogoutView.as_view(next_page='login'), name='logout'),
    path('registro/',views.register_view,name='registro'),

    path('inicio/',login_required(views.Home),name='home'),
    # path('empresa/',login_required(views.empresa),name='empresa'),
    path('test_chatbot/',login_required(views.test_chatbot),name='test_chatbot'),

    path('ir_registrar_empr/', FormularioCliente.ir_registrar_empresa, name='ir_registrar_empr' ),
    path('guardarCliente/', FormularioCliente.procesar_formulario, name='guardarCliente' ),

    # path('guardarCliente/',login_required(views.procesar_formulario),name='guardarCliente'),
    # path('ir_registrar_empr/',login_required(views.ir_registrar_empr),name='ir_registrar_empr'),

    path('respuestas/', modulo_conversacion.conversacion, name='respuestas' ),
    path('usuarios/',login_required(modulo_usuarios.mod_usuario),name='usuarios' ),
    path('clientes/',login_required(modulo_clientes.mod_clientes),name='clientes' ),
    


]