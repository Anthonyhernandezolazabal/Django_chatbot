from django.urls import path
from .import views
from chatbot_admin.views import LoginFormViews
from django.contrib.auth.views import LogoutView
from django.contrib.auth.decorators import login_required
from chatbot_admin.views import FormularioCliente

urlpatterns = [
    path('inicio/',login_required(views.Home),name='home'),
    # path('empresa/',login_required(views.empresa),name='empresa'),
    path('test_chatbot/',login_required(views.test_chatbot),name='test_chatbot'),

    path('registrarCliente/', FormularioCliente.index, name='registrarCliente'),
    path('guardarCliente/', FormularioCliente.procesar_formulario, name='guardarCliente' ),

    path('',LoginFormViews.as_view(),name='login'),
    path('logout/',LogoutView.as_view(next_page='login'), name='logout'),
    path('registro/',views.register_view,name='registro'),
]