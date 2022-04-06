import os
import json
from django.shortcuts import render
from django.http import HttpResponse
from chatbot.models import chat_user,chatbot_style
from chatbot_admin.models import data_set,cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from chatbot.serializers import historialChatSerializers,personalizarChatSerializers
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from difflib import SequenceMatcher
from pathlib import Path
from django.conf import settings
from rest_framework import status
import base64
from django.http import HttpRequest

BASE_DIR = Path(__file__).resolve().parent.parent
ruta_actual = os.path.join(BASE_DIR,'set_datos').replace('\\', '/')
''' =============================================
  CHATTERBOT
============================================= '''
ACCEPTANCE = 0.70 # Una validación de la respuesta mas óptima
''' ======= CARGANDO ARCHIVOS JSON ==== '''
def conversation_directory(id_entrada):
  global CONVERSATION_SETTINGS
  CONVERSATION_SETTINGS = []
  with os.scandir(ruta_actual + '/empresa_'+id_entrada) as ficheros:
    ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]
  ruta2 = ruta_actual + '/empresa_'+id_entrada+'/'
  for x in ficheros:
      CONVERSATION_SETTINGS.append(ruta2 + x)
''' ======= INICIANDO LIBRERIA CHATTERBOT ==== '''
global bot
bot = {}
def initialize(id_user_create):
  global trainer
  nombre_bd = 'midbaprendida_'+id_user_create
  bot[id_user_create] = ChatBot(
    "Chatbot INGyTAL",
    read_only=True,
    statement_comparison_function=comparate_messages,
    response_selection_method=select_response,
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///'+nombre_bd+'.sqlite3',
    logic_adapters=[
        {
            "import_path":"chatterbot.logic.BestMatch",
        }
    ])
  trainer = ListTrainer(bot[id_user_create])
  return nombre_bd
''' ======= CARGAR CONVERSACIÓN ==== '''
def load_conversations():
  conversation = []
  for setting_file in CONVERSATION_SETTINGS:
    with open(setting_file, 'r',encoding="utf-8") as file:
      configured_conversations = json.load(file)
      conversation.append(configured_conversations["conversations"])
      file.close()
  return conversation
''' ======= ENTRENAR  ==== '''
def train_bot(conversations):
  global trainer
  for conversation in conversations:
    for message_response in conversation:
      messages = message_response["messages"]
      response = message_response["response"]
      print("Entrenando al robot para que responda:'",messages, "' con la respuesta'",response,"'")
      for message in messages:
        trainer.train([message,response])
''' ======= RESPONSABLE DE LA SELECCION LA MEJOR RESPUESTA PARA CADA PREGUNTA  ==== '''
def comparate_messages(message, candidate_message):
  similarity = 0.0
  if message.text and candidate_message.text:
        message_text = message.text
        candidate_text = candidate_message.text
        similarity = SequenceMatcher(
          None,
          message_text.lower(),
          candidate_text.lower()
        )
        similarity = round(similarity.ratio(),2)
        if similarity < ACCEPTANCE:
          similarity = 0.0
        else:
          print("Mensaje de usuario:",message_text,", mensaje candidato:",candidate_message,", nível de confianza:", similarity)
        return similarity
def select_response(message, list_response, storage=None):
  response = list_response[0]
  print("respuesta elegida:", response)
  return response
''' =============================================
  END CHATTERBOT
============================================= '''
users__={} #contendra todos los usuarios conectados
entradatmp2=''
#A traves de funciones
def HomeChatbot(request):
  return render(request, 'chatbot/index.html')

# ==== VALIDAR SESION CAPTURANDO NOMBRE ===
def getnombre(request):
  
  user = globals()['users__']
  user_alias = request.GET.get('user_alias')
  user_nom = request.GET.get('nomb')
  user[user_alias]={'nombre': user_nom.lower(), 'bol': 0, 'entradatmp': entradatmp2}
  return HttpResponse(status=201)

# ==== EJECUTAR CONVERSACIÓN ===
def getchat(request):
  if request.GET['msg']:
    entradatmp=''

    nombre_chat = request.GET.get('nombre_chat')
    print('nombre_chat getchat2 :',nombre_chat)
    #nombre_chat getchat : anthony


    user_cook = request.GET.get('user_alias')
    print('user_cook getchat2 :',user_cook)
    #user_cook getchat : rynyshe55uhli6eaqei7k8b65bw5du


    session_cook = {user_cook: {'nombre':nombre_chat, 'bol': 0, 'entradatmp': ''}}
    print('session_cook getchat2 :',session_cook)


    user = session_cook
    #user getchat : {'rynyshe55uhli6eaqei7k8b65bw5du': {'nombre': 'olazabal', 'bol': 0, 'entradatmp': ''}}
    print('user getchat2 :',user)


    myuser = user[user_cook]
    #myuser getchat : {'nombre': 'olazabal', 'bol': 0, 'entradatmp': ''}
    print('myuser getchat222 :',myuser)


    bol=myuser['bol']
    #bol getchat : 0
    print('bol getchat2 :',bol)


    nombre_nombre=myuser['nombre']+'-'+user_cook
    #nombre_nombre getchat : olazabal-rynyshe55uhli6eaqei7k8b65bw5du
    print('nombre_nombre getchat2 :',nombre_nombre)


    entradatmp=myuser['entradatmp']
    #entradatmp getchat :
    print('entradatmp getchat2 :',entradatmp)


    chat_input = request.GET.get('msg')
    id_empresa_id = request.GET.get('id_empresa_id')
    id_user_create = request.GET.get('id_user_create')
    user_autenticate = request.GET.get('user_autenticate')
    initialize(id_user_create)
    if(bol==1):
      print('bol getchat2123231:',bol)
      trainer = ListTrainer(bot[id_user_create])
      trainer.train([str(entradatmp),str(chat_input)])
      rpta2 = "He aprendiendo que cuando digas -> {} <- debo responder -> {} <- ".format(str(entradatmp),str(chat_input))
      myuser['bol']=0
      user[user_cook] = myuser
      session_cook = user
      return HttpResponse(str(rpta2))
    else:
      if chat_input!='adios':
        response = bot[id_user_create].get_response(chat_input)
        if response.confidence > 0.0:
          myuser['bol']= 0
          user[user_cook] = myuser
          session_cook = user
          # === GUARDA LAS SESSIONES EN LA BD
          user_chat = chat_user(pregunta=chat_input,key_session_alias=user_cook,respuesta=response,nombre_persona=nombre_nombre,cliente_empresa_id=cliente.objects.get(pk=id_empresa_id))
          user_chat.save()
          return HttpResponse(str(response))  
        else:
          if user_autenticate == 'True':
            # rpta1 = "Discula no entendí lo que quisiste decir, aún estoy aprendiendo \n ¿Qué debería haber dicho?"
            rpta1 = base64.b64encode('Discula no entendí lo que quisiste decir, aún estoy aprendiendo ¿Qué debería haber dicho?'.encode('utf-8'))
            myuser['bol']=1
            print('bol 1 getchat2 :',myuser['bol'])
            myuser['entradatmp']=chat_input
            print('myuser[entradatmp] 1 getchat2 :',myuser['entradatmp'])
            user[user_cook] = myuser
            print('user[user_cook] 1 getchat2 :',user[user_cook])
            session_cook = user
            print('session_cook 1 getchat2 :',session_cook)
          else:
            # rpta1 = 'Disculpa no te entendí!'
            rpta1 = base64.b64encode('Disculpa no te entendí!'.encode('utf-8'))
          return HttpResponse(str(rpta1,'utf-8')) 
      else:
        rpta_final = "Espero haber atendido tus dudas"
        return HttpResponse(str(rpta_final))
  return HttpResponse(str('ok'))
def getjson(request):
  if request.GET['json_rpt']:
    json_rpt = request.GET.get('json_rpt')
    json_nombre = request.GET.get('json_nombre')
    id_empresa = request.GET.get('id_empresa')
    id_user_create = request.GET.get('id_usu')
    # CREAR EL ARCHIVO JSON
    arrayRecibido = json.loads(json_rpt)
    set_datosAdd = data_set(nombre=json_nombre,conversacion=json_rpt,id_cliente=cliente.objects.get(pk=id_empresa))
    set_datosAdd.save()
    data = {}
    data["conversations"] = []
    for x in range(0,len(arrayRecibido)):
        data['conversations'].append({
          'messages': arrayRecibido[x][0]['preguntas_new'],
          'response': arrayRecibido[x][0]['respuesta_new'],
        })
    with open(ruta_actual+'/empresa_'+id_empresa+'/'+json_nombre+'_'+id_empresa+'.json', 'w', encoding='utf8') as file:
        json.dump(data, file, indent=4,ensure_ascii=False)
    conversation_directory(id_empresa)
    initialize(id_user_create)
    train_bot(load_conversations())
  # return render(request, 'chatbot_admin/layouts/respuestas.html')
  return render(request, 'chatbot_admin/layouts/inicio.html')
  
'''=============================================
  RECIBIENDO RANGO DE FECHAS
============================================= '''
class historialChatApiView(APIView):
  def get(self, request, format=None):
    desde = request.GET.get('desde')
    hasta = request.GET.get('hasta')
    id_empresa = request.GET.get('id_empresa')
    #POSTGRESQL
    rpta = chat_user.objects.raw("SELECT DISTINCT ON (nombre_persona) nombre_persona,id,key_session_alias,cliente_empresa_id_id,registrado,pregunta,respuesta FROM historial_chat WHERE cliente_empresa_id_id="+str(id_empresa)+" AND  registrado BETWEEN SYMMETRIC '"+str(desde)+"' AND '"+str(hasta)+"'")
    serializer_historial = historialChatSerializers(rpta, many=True)
    return Response(serializer_historial.data)
'''=============================================
   MOSTRAR HISTORIAL POR USUARIOS
============================================= '''
class conversacionesApiView(APIView):
  def get(self, request, format=None):
    alias_nom = request.GET.get('usuario_alias')
    datos = chat_user.objects.filter(nombre_persona=alias_nom)
    serializer_conversacion = historialChatSerializers(datos, many=True)
    return Response(serializer_conversacion.data)

'''=============================================
   REGISTRAR / EDITAR  PERSONALIZACIÓN
============================================= '''
class personalizarApiView(APIView):

  def get(self, request, format=None):
    
    id_empresa = request.GET.get('id_empr')
    rpta_pr = chatbot_style.objects.filter(id_empresa_cliente=id_empresa)

    serializer_historial = personalizarChatSerializers(rpta_pr, many=True)

    return Response(serializer_historial.data)


  def post(self, request, format=None):
    serializer = personalizarChatSerializers(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # def put(self, request, pk, format=None):

  #   dt = chatbot_style.objects.get(pk=pk)
  #   serializer = personalizarChatSerializers(dt, data=request.data)

  #   if serializer.is_valid():
  #     serializer.save()
  #     return Response(serializer.data)

  #   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def personalizar_edit(request):

  json_datos = request.GET.get('datos')
  arrayRecibido = json.loads(json_datos)

  print('header',arrayRecibido[0]['titulo_header'])
  print('cuerpo',arrayRecibido[0]['titulo_cuerpo'])
  print('botones',arrayRecibido[0]['botones'])
  print('text_bienvenida',arrayRecibido[0]['text_bienvenida'])

  id_empresa = cliente.objects.get(pk=arrayRecibido[0]['id_empresa_cliente'])
  chatbot_style.objects.filter(pk=arrayRecibido[0]['id']).update(titulo_header=arrayRecibido[0]['titulo_header'],titulo_cuerpo=arrayRecibido[0]['titulo_cuerpo'],botones=arrayRecibido[0]['botones'],text_bienvenida=arrayRecibido[0]['text_bienvenida'],id_empresa_cliente=id_empresa)

  return HttpResponse(str('ok'))


from django.core.files.storage import FileSystemStorage
class mod_slider(HttpRequest):
  def guardar_imagen_slider(request):

    if request.method == 'POST':

      print("hola")
      upload = request.FILES['file']
      fss = FileSystemStorage()
      file = fss.save('slider/' + upload.name, upload)

      print('upload.name file:',file)

      # # upload = request.FILES.get('images2')

      return HttpResponse(str(file))