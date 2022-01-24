from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from datetime import datetime
from chatbot.models import chat_user
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
def conversation_directory():
  ruta = 'C:/Users/ANTHONY/Desktop/Django_chatbot/app/set_datos/'
  # ===== CAPTURO LOS ARCHIVOS JSON =====
  with os.scandir(ruta) as ficheros:
    ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]
    # ===== CONFORME SE VAN CREANDO ARCHIVOS, LOS ALMACENA EN EL ARRAY =====
    for x in ficheros:
        CONVERSATION_SETTINGS.append(ruta+x)
  print('TODOS MIS JSON:',CONVERSATION_SETTINGS)

''' ======= INICIANDO LIBRERIA CHATTERBOT ==== '''
def initialize():
  global bot
  global trainer

  bot = ChatBot(
    "Chatbot INGyTAL",
    read_only=True,
    statement_comparison_function=comparate_messages,
    response_selection_method=select_response,
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///midbaprendida.sqlite3',
    logic_adapters=[
        {
            "import_path":"chatterbot.logic.BestMatch",
        }
    ])
  trainer = ListTrainer(bot)

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

conversation_directory()
initialize()
train_bot(load_conversations())
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
    entradatmp=myuser['entradatmp']
    chat_input = request.GET.get('msg')

    if(bol==1):

      trainer = ListTrainer(bot)
      trainer.train([str(entradatmp),str(chat_input)])
      rpta2 = "He aprendiendo que cuando digas -> {} <- debo responder -> {} <- ".format(str(entradatmp),str(chat_input))
      myuser['bol']=0
      user[user_cook] = myuser
      session_cook = user
      print('variable sesion: ',session_cook[user_cook])
      return HttpResponse(str(rpta2))

    else:

      if chat_input!='adios':
        response = bot.get_response(chat_input)
        if response.confidence > 0.0:
          myuser['bol']= 0
          user[user_cook] = myuser
          session_cook = user
          print('variable sesion: ',session_cook[user_cook])

          # === GUARDA LAS SESSIONES EN LA BD
          user_chat = chat_user(pregunta=chat_input,key_session_id=user_cook,respuesta=response)
          user_chat.save()

          return HttpResponse(str(response))  
        else:
          rpta1 = "Discula no entendí lo que quisiste decir, aún estoy aprendiendo \n ¿Qué debería haber dicho?"
          myuser['bol']=1
          user[user_cook] = myuser
          session_cook = user
          myuser['entradatmp']=chat_input
          #print('variable sesion: ',session_cook[user_cook])
          return HttpResponse(str(rpta1)) 

      else:
        rpta_final = "Espero haber atendido tus dudas"
        return HttpResponse(str(rpta_final))
