from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from datetime import datetime
from chatbot.models import chat_user
from chatbot_admin.models import data_set,cliente
# from .bot_function import conversation_directory,initialize

import os
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import json
from difflib import SequenceMatcher

''' =============================================
  CHATTERBOT
============================================= '''
CONVERSATION_SETTINGS = []
ACCEPTANCE = 0.70 # Una validación de la respuesta mas óptima

''' ======= CARGANDO ARCHIVOS JSON ==== '''
# def conversation_directory():
#   ruta = 'C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/'
#   # ===== CAPTURO LOS ARCHIVOS JSON =====
#   with os.scandir(ruta) as ficheros:
#     ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]
#     # ===== CONFORME SE VAN CREANDO ARCHIVOS, LOS ALMACENA EN EL ARRAY =====
#     for x in ficheros:
#         CONVERSATION_SETTINGS.append(ruta+x)



def conversation_directory(id_entrada):

  if os.path.exists('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_entrada):

    with os.scandir('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_entrada) as ficheros:
      ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]
    
    ruta2 = 'C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_entrada+'/'
    for x in ficheros:
        CONVERSATION_SETTINGS.append(ruta2 + x)

    print('EL DIRECTORIO SI EXISTE', CONVERSATION_SETTINGS)

  else:

    with os.scandir('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/') as ficheros:
      ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]

    # CONFORME SE VAN CREANDO ARCHIVOS, LOS ALMACENA EN EL ARRAY
    for x in ficheros:
        CONVERSATION_SETTINGS.append('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/'+x)

    print('EL DIRECTORIO NO EXISTE')





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
  #print("respuesta elegida:", response)

  return response


# initialize()
# train_bot(load_conversations())
''' =============================================
  END CHATTERBOT
============================================= '''

#A traves de clases
# class HomeChatbot(generic.TemplateView):
#     template_name = 'chatbot/index.html'

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

  print('mi user name :',user)

  return HttpResponse(status=201)

# ==== EJECUTAR CONVERSACIÓN ===
def getchat(request):
  global session_cook
  global user_alias

  if request.GET['msg']:

    user_cook = user_alias
    print('capturando mi session :',user_cook)
    user = session_cook

    myuser = user[user_cook]

    bol=myuser['bol']
    nombre_nombre=myuser['nombre']
    entradatmp=myuser['entradatmp']
    chat_input = request.GET.get('msg')

    id_empresa_id = request.GET.get('id_empresa_id')

    print('id_empresa_id chat: ',id_empresa_id)


    id_user_create = request.GET.get('id_user_create')
    print('id_user_create recibido desde JS :',id_user_create)
    print('chat_input recibido desde JS :',chat_input)

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

import json

def getjson(request):
  if request.GET['json_rpt']:

    json_rpt = request.GET.get('json_rpt')
    json_nombre = request.GET.get('json_nombre')
    id_empresa = request.GET.get('id_empresa')
    id_user_create = request.GET.get('id_usu')

    # CREAR EL ARCHIVO JSON
    arrayRecibido = json.loads(json_rpt)

    print ('mi json_nombre :',json_nombre)
    print ('mi arrayRecibido :',arrayRecibido)
    print ('mi id_empresa :',id_empresa)
    print ('mi id_user_create :',id_user_create)

    set_datosAdd = data_set(nombre=json_nombre,conversacion=json_rpt,id_cliente=cliente.objects.get(pk=id_empresa))
    set_datosAdd.save()

    data = {}
    data['conversations'] = []
    data['conversations'].append({
        'messages': arrayRecibido[0][0]['preguntas_new'],
        'response': arrayRecibido[0][0]['respuesta_new'],
        })
    

    with open('C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/empresa_'+id_empresa+'/'+json_nombre+'_'+id_empresa+'.json', 'w', encoding='utf8') as file:
        json.dump(data, file, indent=4,ensure_ascii=False)

    # conversation_directory(id_empresa)
    # initialize(id_user_create)
    # train_bot(load_conversations())

  return render(request, 'chatbot_admin/layouts/respuestas.html')

def entrenar_chatbot(request):

  if request.GET['id_empresa']:
    id_empresa = request.GET.get('id_empresa')
    id_user_create = request.GET.get('id_user_create')

    print('id_empresa :',id_empresa)
    print('id_user_create :',id_user_create)

    conversation_directory(id_empresa)
    initialize(id_user_create)
    train_bot(load_conversations())

  return render(request, 'chatbot_admin/layouts/respuestas.html')