from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages

@ login_required ( login_url= 'home' )
def Home(request):
  return render(request, 'chatbot_admin/layouts/inicio.html')

class LoginFormViews(LoginView):
  template_name = 'chatbot_admin/registration/login.html'

  def dispatch(self, request, *args, **kwargs):
      if request.user.is_authenticated:
        return redirect('home')
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

  # data = {'form': CustomUserCreationForm()}
  
  # if request.method == 'POST':
  #   formulario = CustomUserCreationForm(data=request.POST)
  #   if formulario.is_valid():
  #     formulario.save()
  #     user = authenticate(username=formulario.cleaned_data['username'],password=formulario.cleaned_data['password1'])
  #     login(request, user)
  #     print('registrado')
  #     return redirect(to='login')
  #   data["form"] = formulario
  # return render(request, 'chatbot_admin/registration/login.html',data)

  if request.method == 'POST':
    form = UserRegisterForm(request.POST)
    if form.is_valid():
      form.save()
      username = form.cleaned_data['username']
      messages.success(request, f"Usuario {username} creado")
      return redirect('login')
  else:
    form = UserRegisterForm()
  
  context = {'form':form}
  return render(request,'chatbot_admin/registration/register.html',context)
    
