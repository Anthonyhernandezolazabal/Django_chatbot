import os
import datetime
from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.contrib import messages
from chatbot.views import initialize,conversation_directory,load_conversations,train_bot
from chatbot_admin.models import cliente,datasetpreguntas
from django.http import HttpRequest
from chatbot_admin.forms import ClientRegisterForm
from profile_user.models import UserProfile
from chatbot.models import chat_user
from pathlib import Path
from django.views.generic import TemplateView
from django.contrib.auth import login, logout,authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages

BASE_DIR = Path(__file__).resolve().parent.parent
ruta_actual = os.path.join(BASE_DIR,'set_datos').replace('\\', '/')


"""=============================================
VISTA INICIO
============================================="""
@ login_required ( login_url= 'home' )
def Home(request):
  return render(request, 'chatbot_admin/layouts/inicio.html')

def logout_request(request):
  logout(request)
  messages.info("Saliste exitosamente")
  return redirect("login")


def login_request(request):
  form = AuthenticationForm()
  return render(request, 'chatbot_admin/layouts/login.html',{"form":form})



"""=============================================
INICIAR SESION
============================================="""
class LoginFormViews(LoginView):
  template_name = 'chatbot_admin/registration/login.html'
  def dispatch(self, request, *args, **kwargs):
      if request.user.is_authenticated:
        clt = ClientRegisterForm()
        global id_user_login
        user_autenticate = request.user.is_authenticated
        # capturando el id
        id_user_login = request.session.get('_auth_user_id')
        username_user_login = request.user.username
        user = UserProfile.objects.get(pk=id_user_login)
        id_clt = user.id_cliente
        tipo_usu = user.is_superuser
        # Si no tiene empresa registrada
        if id_clt is None:

          #creamos sesion para validar la primera página
          validar = request.session["reg_empresa"] = True #Pendiete a registrar empresa

          #INICIAR BOT
          t = initialize(id_user_login)
          params = {"id_user": id_user_login,"username_user": username_user_login,'nombreBD': t,'form':clt,'user_autenticate':user_autenticate,'validate':validar}
          return render(request,"chatbot_admin/registration/confirmar_registro.html",params)
        # Tiene empresa registrada
        else:
          empre_id= user.id_cliente.id
          #INICIAR BOT
          t = initialize(id_user_login)
          params = {"id_user": id_user_login,"username_user": username_user_login,'nombreBD': t,'id_empresa':empre_id,'tipo_usu':tipo_usu,'user_autenticate':user_autenticate}
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
    if request.GET['e']:
      empre_id=request.GET.get('e')
      empre__id = empre_id[5:-5]


      us_id=request.GET.get('u')
      us__id = us_id[5:-5]


      params= { 
              'id_empresa_py':empre__id,
              'id_usuario_py':us__id
              }

      return render(request, 'chatbot_admin/layouts/test_chatbot.html',params)

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
    if request.GET['i']:


      print("veeeeeeer :",request.session["reg_empresa"])

      if request.session["reg_empresa"] is True:
        cliente_id=request.GET.get('i')
        cliente___id = cliente_id[5:-5]
        clt = ClientRegisterForm()
        return render(request, "chatbot_admin/registration/registrar_empresa.html", {'form':clt,'cliente_id':cliente___id})
      else:
        request.session["reg_empresa"] = False
        return render(request, "chatbot_admin/registration/login.html")
    
  
  
  
  
  def procesar_formulario(request):
    if request.method == 'POST':
      clt = ClientRegisterForm(request.POST)
      id__login = request.POST.get('cliente_id')
      id_user_login = id__login[5:-5]
      if clt.is_valid():
        s = clt.save()
        clt = ClientRegisterForm()
        id_empresa = cliente.objects.get(pk=s.id)
        UserProfile.objects.filter(pk=id_user_login).update(id_cliente=id_empresa.id)
        empre_id = str(id_empresa.id)
        # CREAR DIRECTORIO
        directorio = ruta_actual+"/empresa_"+empre_id
        try:
            os.mkdir(directorio)
        except OSError:
            print("La creación del directorio %s falló" % directorio)
        else:
            print("Se ha creado el directorio: %s " % directorio)
            conversation_directory(empre_id)
            initialize(id_user_login)
            train_bot(load_conversations())
          
        request.session["reg_empresa"] = False
        return render(request, "chatbot_admin/layouts/inicio.html", {'mensaje':'ok','id_empresa':empre_id})
    else:
      
      request.session["reg_empresa"] = False
      clt = ClientRegisterForm()
      return render(request, "chatbot_admin/registration/registrar_empresa.html", {'form':clt})

"""=============================================
MÓDULO RESPUESTAS
============================================="""
class modulo_conversacion(HttpRequest):
  def respuestas(request):
    if request.GET['i']:
      empre_id=request.GET.get('i')
      empresa_id_encode = empre_id[5:-5]
      jsondata = datasetpreguntas.objects.filter(id_cliente=empresa_id_encode)
      context = {
        'datos':jsondata
      }
      return render(request, 'chatbot_admin/layouts/respuestas.html',context)
    else:
      return render(request, 'chatbot_admin/layouts/404.html')
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
    if request.GET['i']:
      empre_id=request.GET.get('i')
      print("RESPUESTACOD :",empre_id)
      empresa_id_encode = empre_id[5:-5]
      print("RESPUESTAENCOD :",empresa_id_encode)
      #CAPTURANDO EL ALIAS
      user_alias = request.session.session_key
      hoy = datetime.datetime.utcnow().strftime("%Y-%m-%d")
      ahora = datetime.datetime.utcnow()
      tomorrow = ahora + datetime.timedelta(days=1)
      hasta = tomorrow.strftime("%Y-%m-%d")

      try:
        obj_idcl = cliente.objects.get(pk=empresa_id_encode)
      except cliente.DoesNotExist:
        return render(request, 'chatbot_admin/layouts/404.html')

      #POSTGRESQL
      jsondata_h = chat_user.objects.raw("SELECT DISTINCT ON (nombre_persona) nombre_persona,id,key_session_alias,cliente_empresa_id_id,registrado,pregunta,email_persona,telefono_persona,respuesta FROM historial_chat WHERE cliente_empresa_id_id="+str(empresa_id_encode)+" AND  registrado BETWEEN SYMMETRIC '"+str(hoy)+"' AND '"+str(hasta)+"'")
      context = {
        'datos':jsondata_h
      }
      return render(request, 'chatbot_admin/layouts/historial.html',context)
    else:
      return render(request, 'chatbot_admin/layouts/404.html')

  """=============================================
  REPORTES DINÁMICOS PARA OBTENER LOS DATOS INGRESADOS
  ============================================="""
  def vista_rpt(request):










    return render(request, 'chatbot_admin/layouts/datos-historial.html')


"""=============================================
MÓDULO APARIENCIA
============================================="""
class modulo_Personalizar(HttpRequest):
  def mod_Personalizar(request):
    return render(request, 'chatbot_admin/layouts/personalizar.html')
"""=============================================
MÓDULO CONFIRGURACIONES
============================================="""
class modulo_Configurar(HttpRequest):
  def mod_configurar(request):
    return render(request, 'chatbot_admin/layouts/configuracion.html')

"""=============================================
ERROR 404
============================================="""
class Error404View(TemplateView):
  template_name = 'chatbot_admin/layouts/404.html'

"""=============================================
MÓDULO PROFILE
============================================="""
class modulo_profile(HttpRequest):
  def profile_view(request):
    return render(request, 'chatbot_admin/layouts/profile.html')