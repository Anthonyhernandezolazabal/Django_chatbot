from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from chatbot.views import initialize,conversation_directory,load_conversations,train_bot
from django.http import HttpResponse
from chatbot_admin.models import cliente
from django.http import HttpRequest
from chatbot_admin.forms import ClientRegisterForm
from profile_user.models import UserProfile

@ login_required ( login_url= 'home' )
def Home(request):
  return render(request, 'chatbot_admin/layouts/inicio.html')

class LoginFormViews(LoginView):
  template_name = 'chatbot_admin/registration/login.html'

  def dispatch(self, request, *args, **kwargs):
      if request.user.is_authenticated:
        clt = ClientRegisterForm()
        global id_user_login
        # capturando el id
        id_user_login = request.session.get('_auth_user_id')
        username_user_login = request.user.username

        print('id_user_login :',id_user_login)
        print('username_user_login :',username_user_login)

        

        user = UserProfile.objects.get(pk=id_user_login)

        id_clt = user.id_cliente
        

        if id_clt is None:

          #INICIAR BOT
          t = initialize(id_user_login)
          # conversations = load_conversations()

          # if conversations:
          #   train_bot(conversations)

          params = {"id_user": id_user_login,"username_user": username_user_login,'nombreBD': t,'form':clt}
          return render(request,"chatbot_admin/layouts/registrar_empresa.html",params)


        else:

          #INICIAR BOT
          t = initialize(id_user_login)

          params = {"id_user": id_user_login,"username_user": username_user_login,'nombreBD': t}
          return render(request,"chatbot_admin/layouts/inicio.html",params)
        
        # return redirect('home')
        # return render(request,"chatbot_admin/layouts/registrar_empresa.html",params)
        
        
      return super().dispatch(request, *args, **kwargs)

  def get_context_data(self,**kwargs):
      context = super().get_context_data(**kwargs)
      context['title'] = 'Iniciar sesion'
      return context


def test_chatbot(request):
  return render(request, 'chatbot_admin/layouts/test_chatbot.html')

# def register_view(request):
#   data = {
#     'form': UserRegisterForm()
#   }
  
#   return render(request, 'chatbot_admin/registration/register.html',data)

def register_view(request):

  if request.method == 'POST':
    form = UserRegisterForm(request.POST)
    if form.is_valid():
      form.save()

      # capturando el id
      id_user_create = str(form.instance.id) 

      #CREAR CHATBOT
      initialize(id_user_create)
      conversations = load_conversations()

      if conversations:
          train_bot(conversations)

      username = form.cleaned_data['username']
      messages.success(request, f"Usuario {username} creado")
      return redirect('login')

  else:
    form = UserRegisterForm()
  
  context = {'form':form}
  return render(request,'chatbot_admin/registration/register.html',context)
 

def procesar_formulario(request):
  global id_user_login
  if request.method == 'POST':
    clt = ClientRegisterForm(request.POST)
    if clt .is_valid():
      s = clt.save()
      clt = ClientRegisterForm()
      c = cliente.objects.get(pk=s.id)

      user = UserProfile.objects.filter(pk=id_user_login).first()
      print(id_user_login)
      UserProfile.objects.filter(pk=id_user_login).update(id_cliente=c.id)

      # usuario = UserProfile(user)
      # usuario.id_cliente = cliente.objects.get(pk=s.id)
      # usuario.save()

      # user = UserProfile.objects.get(pk=id_user_login)
      # UserProfile.id_cliente=c.id
      # id_clt = UserProfile.id_cliente
      # UserProfile.save()

      return render(request, "chatbot_admin/layouts/inicio.html", {'mensaje':'ok'})

  else:

    clt = ClientRegisterForm()

  return render(request, "chatbot_admin/layouts/registrar_empresa.html", {'form':clt})