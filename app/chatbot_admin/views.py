from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from chatbot.views import initialize,conversation_directory,load_conversations,train_bot

@ login_required ( login_url= 'home' )
def Home(request):
  return render(request, 'chatbot_admin/layouts/inicio.html')

class LoginFormViews(LoginView):
  template_name = 'chatbot_admin/registration/login.html'

  def dispatch(self, request, *args, **kwargs):
      if request.user.is_authenticated:
        
        # capturando el id
        id_user_login = request.session.get('_auth_user_id')
        username_user_login = request.user.username

        params = {"id_user": id_user_login,"username_user": username_user_login}
        print('params :',params)

        #INICIAR BOT
        initialize(id_user_login)
        conversations = load_conversations()

        print('conversations: ',conversations)
        if conversations:
          train_bot(conversations)
        
        # return redirect('home')
        return render(request,"chatbot_admin/layouts/inicio.html",params)
        
        
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

      print('conversations: ',conversations)
      if conversations:
          train_bot(conversations)

      username = form.cleaned_data['username']
      messages.success(request, f"Usuario {username} creado")
      return redirect('login')

  else:
    form = UserRegisterForm()
  
  context = {'form':form}
  return render(request,'chatbot_admin/registration/register.html',context)
    
