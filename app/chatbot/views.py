from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from datetime import datetime
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

  nombre_nom = request.GET.get('nomb')
  request.session['usuario_us'] = nombre_nom

  return HttpResponse(status=201)

# ==== EJECUTAR CONVERSACIÓN ===
def getchat(request):

  user = globals()['users__']
  nombre_alias = request.session.session_key
  nombre_nom = request.GET.get('nom')

  user[nombre_alias]={'nombre': nombre_nom.lower(), 'bol': 0, 'entradatmp': entradatmp}

  print('USEEEER :',user)

  user2 = user 
  myuser = user2[nombre_alias]
  bol=myuser['bol'] 

  entradatmp2=myuser['entradatmp']
  chat_input = request.GET.get('msg')

  print('mi variable chat_input de inicioooo : ',chat_input)
  print('mi variable bol de inicioooo : ',bol)
  print('mi variable entradatmp2 de inicioooo : ',entradatmp2)

  if(bol==1):
    trainer = ListTrainer(bot)
    trainer.train([str(entradatmp),str(chat_input)])
    rpta2 = "He aprendiendo que cuando digas -> {} <- debo responder -> {} <- ".format(str(entradatmp),str(chat_input))
    myuser['bol']=0
    user[nombre_alias] = myuser
    user3 = user2
    print('variable sesion: ',user3[nombre_alias])
    return HttpResponse(str(rpta2))
  else:
    if chat_input!='adios':
      response = bot.get_response(chat_input)
      print ('response :',response)
      if response.confidence > 0.0:
        myuser['bol']= 0
        user[nombre_alias] = myuser
        user3 = user2
        print('variable sesion: ',user3[nombre_alias])
        return HttpResponse(str(response))
      else:
        rpta1 = "Discula no entendí lo que quisiste decir, aún estoy aprendiendo \n ¿Qué debería haber dicho?"
        myuser['bol']=1
        user[nombre_alias] = myuser
        user3 = user2
        myuser['entradatmp']=chat_input
        #print('variable sesion: ',session['usuario_us'][user_cook])
        return HttpResponse(str(rpta1))

      # return str('ok bol 0')
    else:
      rpta_final = "Espero haber atendido tus dudas"
      return HttpResponse(str(rpta_final))

  