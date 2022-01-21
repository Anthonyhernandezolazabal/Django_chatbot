from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

@ login_required ( login_url= 'home' )
def Home(request):
  return render(request, 'chatbot_admin/inicio.html')

class LoginFormViews(LoginView):
  template_name = 'chatbot_admin/acceso.html'

  def dispatch(self, request, *args, **kwargs):
      if request.user.is_authenticated:
        return redirect('home')
      return super().dispatch(request, *args, **kwargs)

  def get_context_data(self,**kwargs):
      context = super().get_context_data(**kwargs)
      context['title'] = 'Iniciar sesion'
      return context

def test_chatbot(request):
  return render(request, 'chatbot_admin/test_chatbot.html')