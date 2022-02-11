from django.shortcuts import render
from django.http import HttpResponse
from chatbot.models import chat_user
from chatbot_admin.models import data_set,cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from chatbot.serializers import historialChatSerializers
import os
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import json
from difflib import SequenceMatcher

''' =============================================
  CHATTERBOT
============================================= '''
ACCEPTANCE = 0.70 # Una validación de la respuesta mas óptima
''' ======= CARGANDO ARCHIVOS JSON ==== '''
def conversation_directory(id_entrada):
  global CONVERSATION_SETTINGS
  CONVERSATION_SETTINGS = []
  with os.scandir('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_entrada) as ficheros:
    ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]
  ruta2 = 'C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_entrada+'/'
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
entradatmp=''
#A traves de funciones
def HomeChatbot(request):
  return render(request, 'chatbot/index.html')
# ==== VALIDAR SESION CAPTURANDO NOMBRE ===
def getnombre(request):
  global session_cook
  global user_alias
  if not request.session.session_key:
    request.session.create()
  else:
    request.session.session_key
  user = globals()['users__']
  user_alias = request.session.session_key
  user_nom = request.GET.get('nomb')
  user[user_alias]={'nombre': user_nom.lower(), 'bol': 0, 'entradatmp': entradatmp}
  session_cook = user
  return HttpResponse(status=201)
# ==== EJECUTAR CONVERSACIÓN ===
def getchat(request):
  global session_cook
  global user_alias
  if request.GET['msg']:
    user_cook = user_alias
    user = session_cook
    myuser = user[user_cook]
    bol=myuser['bol']
    nombre_nombre=myuser['nombre']+'-'+user_cook
    entradatmp=myuser['entradatmp']
    chat_input = request.GET.get('msg')
    id_empresa_id = request.GET.get('id_empresa_id')
    id_user_create = request.GET.get('id_user_create')
    initialize(id_user_create)
    if(bol==1):
      trainer = ListTrainer(bot[id_user_create])
      trainer.train([str(entradatmp),str(chat_input)])
      rpta2 = "He aprendiendo que cuando digas -> {} <- debo responder -> {} <- ".format(str(entradatmp),str(chat_input))
      myuser['bol']=0
      user[user_cook] = myuser
      session_cook = user
      print('variable sesion: ',session_cook[user_cook])
      return HttpResponse(str(rpta2))
    else:
      if chat_input!='adios':
        response = bot[id_user_create].get_response(chat_input)
        if response.confidence > 0.0:
          myuser['bol']= 0
          user[user_cook] = myuser
          session_cook = user
          print('variable sesion: ',session_cook[user_cook])
          # === GUARDA LAS SESSIONES EN LA BD
          user_chat = chat_user(pregunta=chat_input,key_session_id=user_cook,respuesta=response,nombre_persona=nombre_nombre,cliente_empresa_id=cliente.objects.get(pk=id_empresa_id))
          user_chat.save()
          return HttpResponse(str(response))  
        else:
          if request.user.is_authenticated:
            rpta1 = "Discula no entendí lo que quisiste decir, aún estoy aprendiendo \n ¿Qué debería haber dicho?"
            myuser['bol']=1
            user[user_cook] = myuser
            session_cook = user
            myuser['entradatmp']=chat_input
            #print('variable sesion: ',session_cook[user_cook])
          else:
            rpta1 = 'Disculpa no te entendí, sé mas especifico!'
          return HttpResponse(str(rpta1)) 
      else:
        rpta_final = "Espero haber atendido tus dudas"
        return HttpResponse(str(rpta_final))
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
    with open('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_empresa+'/'+json_nombre+'_'+id_empresa+'.json', 'w', encoding='utf8') as file:
        json.dump(data, file, indent=4,ensure_ascii=False)
    conversation_directory(id_empresa)
    initialize(id_user_create)
    train_bot(load_conversations())
  return render(request, 'chatbot_admin/layouts/respuestas.html')
'''=============================================
  RECIBIENDO RANGO DE FECHAS
============================================= '''
class historialChatApiView(APIView):
  def get(self, request, format=None):
    desde = request.GET.get('desde')
    hasta = request.GET.get('hasta')
    id_empresa = request.GET.get('id_empresa')
    # search = chat_user.objects.all()
    # rpta = search.filter(cliente_empresa_id=id_empresa,registrado__range=[desde,hasta])
    rpta = chat_user.objects.raw('SELECT * FROM historial_chat WHERE cliente_empresa_id_id='+id_empresa+' AND registrado BETWEEN "'+desde+'" AND "'+hasta+'" GROUP BY nombre_persona')
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