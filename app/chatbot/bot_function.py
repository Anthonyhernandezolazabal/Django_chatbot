import os
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import json
from difflib import SequenceMatcher

CONVERSATION_SETTINGS = []
ACCEPTANCE = 0.70 # Una validación de la respuesta mas óptima

''' ======= CARGANDO ARCHIVOS JSON ==== '''
def conversation_directory():
  ruta = './set_datos'
  # ===== CAPTURO LOS ARCHIVOS JSON =====
  with os.scandir(ruta) as ficheros:
    ficheros = [fichero.name for fichero in ficheros if fichero.is_file()]
    # ===== CONFORME SE VAN CREANDO ARCHIVOS, LOS ALMACENA EN EL ARRAY =====
    for x in ficheros:
        CONVERSATION_SETTINGS.append(ruta+x)

''' ======= INICIANDO LIBRERIA CHATTERBOT ==== '''
def initialize():
  global bot
  global trainer

  bot = ChatBot (
    "Chatbot INGyTAL ",
    read_only=True,
    # statement_comparison_function=comparate_messages,
    response_selection_method=select_response,
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///midbaprendida.sqlite3',
    logic_adapters=[
        {
            "import_path":"chatterbot.logic.BestMatch",
        }
    ]
  )
  trainer = ListTrainer(bot)

''' ======= CARGAR CONVERSACIÓN ==== '''
def load_conversation():
  conversation = []

  for setting_file in CONVERSATION_SETTINGS:
    with open(setting_file, 'r', encoding='utf-8') as file:
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
