import os
import shutil #mover archivos
from datetime import datetime
from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from chatbot.views import initialize,conversation_directory,load_conversations,train_bot
from django.http import HttpResponse
from chatbot_admin.models import cliente,data_set
from django.http import HttpRequest
from chatbot_admin.forms import ClientRegisterForm
from profile_user.models import UserProfile
from chatbot.models import chat_user

"""=============================================
VISTA INICIO
============================================="""
@ login_required ( login_url= 'home' )
def Home(request):
  return render(request, 'chatbot_admin/layouts/inicio.html')

"""=============================================
INICIAR SESION
============================================="""
class LoginFormViews(LoginView):
  template_name = 'chatbot_admin/registration/login.html'

  def dispatch(self, request, *args, **kwargs):
      if request.user.is_authenticated:
        clt = ClientRegisterForm()
        global id_user_login
        global empre_id

        # capturando el id
        id_user_login = request.session.get('_auth_user_id')
        username_user_login = request.user.username
        user = UserProfile.objects.get(pk=id_user_login)
        id_clt = user.id_cliente
        tipo_usu = user.is_superuser

        if id_clt is None:

          #INICIAR BOT
          t = initialize(id_user_login)
          params = {"id_user": id_user_login,"username_user": username_user_login,'nombreBD': t,'form':clt}
          return render(request,"chatbot_admin/registration/confirmar_registro.html",params)

        else:

          empre_id= user.id_cliente.id
          # intempr = int(id_empresa)
          #INICIAR BOT
          t = initialize(id_user_login)
          params = {"id_user": id_user_login,"username_user": username_user_login,'nombreBD': t,'id_empresa':empre_id,'tipo_usu':tipo_usu}
          return render(request,"chatbot_admin/layouts/inicio.html",params)
        
      return super().dispatch(request, *args, **kwargs)

  def get_context_data(self,**kwargs):
      context = super().get_context_data(**kwargs)
      context['title'] = 'Iniciar sesion'
      return context

"""=============================================
MODULO PRUEBAR CHATBOT
============================================="""
def test_chatbot(request):
  return render(request, 'chatbot_admin/layouts/test_chatbot.html')


"""=============================================
REGISTRAR NUEVO USUARIO
============================================="""
def register_view(request):

  if request.method == 'POST':
    form = UserRegisterForm(request.POST)
    if form.is_valid():
      form.save()

      # capturando el id
      id_user_create = str(form.instance.id) 

      username = form.cleaned_data['username']
      messages.success(request, f"Usuario {username} creado")
      return redirect('login')

  else:

    form = UserRegisterForm()
  
  context = {'form':form}
  return render(request,'chatbot_admin/registration/register.html',context)

"""=============================================
REGISTRAR NUEVA EMPRESA 
============================================="""
class FormularioCliente(HttpRequest):

  def ir_registrar_empresa(request):
    clt = ClientRegisterForm()
    return render(request, "chatbot_admin/registration/registrar_empresa.html", {'form':clt})

  def procesar_formulario(request):
    global id_user_login
    global empre_id
    if request.method == 'POST':
      clt = ClientRegisterForm(request.POST)
      if clt .is_valid():
        s = clt.save()
        clt = ClientRegisterForm()
        id_empresa = cliente.objects.get(pk=s.id)
        # user = UserProfile.objects.filter(pk=id_user_login).first()
        UserProfile.objects.filter(pk=id_user_login).update(id_cliente=id_empresa.id)
        empre_id = str(id_empresa.id)

        # usuario = UserProfile(user)
        # usuario.id_cliente = cliente.objects.get(pk=s.id)
        # usuario.save()

        # user = UserProfile.objects.get(pk=id_user_login)
        # UserProfile.id_cliente=c.id
        # id_clt = UserProfile.id_cliente
        # UserProfile.save()

        # CREAR DIRECTORIO
        directorio = "C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_"+empre_id
        try:
            os.mkdir(directorio)
        except OSError:
            print("La creación del directorio %s falló" % directorio)
        else:
            print("Se ha creado el directorio: %s " % directorio)
            # shutil.copy('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/basic_information.json', "C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_"+empre_id)
            shutil.copy('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/greetings.json', "C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_"+empre_id)

            conversation_directory(empre_id)
            initialize(id_user_login)
            train_bot(load_conversations())

        return render(request, "chatbot_admin/layouts/inicio.html", {'mensaje':'ok','empresa_logueado2':empre_id})

    else:

      clt = ClientRegisterForm()

    return render(request, "chatbot_admin/registration/registrar_empresa.html", {'form':clt})

"""=============================================
MÓDULO RESPUESTAS
============================================="""
class modulo_conversacion(HttpRequest):

  def respuestas(request):
    global empre_id

    print('empre_id de registro :',empre_id)

    jsondata = data_set.objects.filter(id_cliente=empre_id)
    # id = jsondata.id
    # nombre = jsondata.nombre 
    # nombre_cliente = jsondata.id_cliente.nombre
    # registrado = jsondata.registrado


    context = {
      # 'id':id,'nombre':nombre,'nombre_cliente':nombre_cliente,'registrado':registrado
      'datos':jsondata
    }

    return render(request, 'chatbot_admin/layouts/respuestas.html',context)

  def registrar_rpta(request):
    return render(request, 'chatbot_admin/layouts/registar_respuestas.html')

"""=============================================
MÓDULO USUARIOS
============================================="""
class modulo_usuarios(HttpRequest):
  
  def mod_usuario(request):

    userall = UserProfile.objects.all()

    context = {
      'userall':userall
    }

    return render(request, 'chatbot_admin/layouts/usuarios.html',context)

"""=============================================
MÓDULO CLIENTES
============================================="""
class modulo_clientes(HttpRequest):
  
  def mod_clientes(request):

    clienteall = cliente.objects.all()

    context = {
      'cltall':clienteall
    }

    return render(request, 'chatbot_admin/layouts/clientes.html',context)

"""=============================================
MÓDULO HISTORIAL
============================================="""
class modulo_historial_conversacion(HttpRequest):

  def mod_historial(request):
    global empre_id

    jsondata_h = chat_user.objects.filter(cliente_empresa_id=empre_id).values('registrado') 
    # jsondata_h = chat_user.objects.filter(cliente_empresa_id=empre_id).values('registrado') 
    # jsondata_h = chat_user.objects.filter(cliente_empresa_id=empre_id).queryset.filter(created_at=(first_date))

    # print('empre_id de mod_historial :',empre_id)
    # print('jsondata de mod_historial :',jsondata_h)
  
    # print("El día actual es {}".format(dd.day))
    # print("El mes actual es {}".format(dd.month))
    # print("El año actual es {}".format(dd.year))

    context = {
      'datos':jsondata_h
    }

    return render(request, 'chatbot_admin/layouts/historial.html',context)
