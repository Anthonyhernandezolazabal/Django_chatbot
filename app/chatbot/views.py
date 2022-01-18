from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from datetime import datetime
from .bot_function import conversation_directory

#A traves de clases
# class HomeChatbot(generic.TemplateView):
#     template_name = 'chatbot/index.html'


users__={} #contendra todos los usuarios conectados
entradatmp=''


#A traves de funciones
def HomeChatbot(request):
  return render(request, 'chatbot/index.html')

# # ==== VALIDAR SESION CAPTURANDO NOMBRE ===
# def getnombre(request):

#   #Asignamos un nuevo nombre
#   now = datetime.now()
#   tiempo=now.strftime('%Y%H%M%S')
#   user = globals()['users__']

#   nombre_alias = request.GET.get('nomb')+'-'+tiempo
#   nombre_nom = request.GET.get('nomb')
#   print("Mi usuario:",nombre_alias+' : '+nombre_nom)

#   user[nombre_alias]={'nombre': nombre_nom.lower(), 'bol': 0, 'entradatmp': entradatmp}
  
#   #Sessiones
#   request.session['usuario_us'] = user
  
#   redicturl = HttpResponse('Cookie Establecida')

#   redicturl.set_cookie('user_alias_us',nombre_alias)

#   conversation_directory()

#   return HttpResponse(status=201)

# # ==== EJECUTAR CONVERSACIÓN ===
# def getchat(request):

#   # user_cook = request.session.session_key()
#   # user_cook = request.COOKIES.sessionid()
#   user_cook = request.cookies.get('user_alias_us')

#   print('user_cook :', user_cook)

#   return HttpResponse(status=201)