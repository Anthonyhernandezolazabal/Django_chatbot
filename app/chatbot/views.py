import os
import json
from django.shortcuts import render
from chatbot.models import chat_user,chatbot_style
from chatbot_admin.models import datasetpreguntas,cliente,configuraciones
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from chatbot.serializers import historialChatSerializers,personalizarChatSerializers,datasetSerializers
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from difflib import SequenceMatcher
from pathlib import Path
from django.conf import settings
from rest_framework import status
import base64
from django.http import HttpRequest,HttpResponse
from django.core import serializers
from os import remove
import time
import csv
# import xlwt
import datetime

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
    email_chat = request.GET.get('email_chat')
    phone_chat = request.GET.get('phone_chat')
    #nombre_chat getchat : anthony
    user_cook = request.GET.get('user_alias')
    #user_cook getchat : rynyshe55uhli6eaqei7k8b65bw5du
    session_cook = {user_cook: {'nombre':nombre_chat, 'bol': 0, 'entradatmp': ''}}
    user = session_cook
    #user getchat : {'rynyshe55uhli6eaqei7k8b65bw5du': {'nombre': 'olazabal', 'bol': 0, 'entradatmp': ''}}
    myuser = user[user_cook]
    #myuser getchat : {'nombre': 'olazabal', 'bol': 0, 'entradatmp': ''}
    bol=myuser['bol']
    #bol getchat : 0
    nombre_nombre=myuser['nombre']+'-'+user_cook
    nombre_sin_alias=myuser['nombre']
    #nombre_nombre getchat : olazabal-rynyshe55uhli6eaqei7k8b65bw5du
    entradatmp=myuser['entradatmp']
    #entradatmp getchat :
    chat_input = request.GET.get('msg')
    id_empresa_id = request.GET.get('id_empresa_id')
    id_user_create = request.GET.get('id_user_create')
    user_autenticate = request.GET.get('user_autenticate')
    initialize(id_user_create)
    if(bol==1):
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
          n__ow = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
          print("FECHA DE REGISTRO2 :",n__ow)
          user_chat = chat_user(
            pregunta=chat_input,
            key_session_alias=user_cook,
            respuesta=response,
            nombre_persona=nombre_nombre,
            nombre_persona_sin_alias=nombre_sin_alias,
            fecha_historial_chat=n__ow,
            estado_chat='novisto',
            email_persona=email_chat,
            telefono_persona=phone_chat,
            cliente_empresa_id=cliente.objects.get(pk=id_empresa_id))
          user_chat.save()
          return HttpResponse(str(response))  
        else:
          # if user_autenticate == 'True':
          #   # rpta1 = "Discula no entendí lo que quisiste decir, aún estoy aprendiendo \n ¿Qué debería haber dicho?"
          #   cda = '{"respuesta_tipo": [{"tipo": "texto","rpta": [{"respueta_sl_texto": "Discula no entendí lo que quisiste decir, aún estoy aprendiendo ¿Qué debería haber dicho?"}]}]}'
          #   rpta1 = base64.b64encode(cda.encode('utf-8'))
          #   print('rptaaaaaaaaaaaaaaaaaaaa: ',rpta1)
          #   myuser['bol']=1
          #   myuser['entradatmp']=chat_input
          #   user[user_cook] = myuser
          #   session_cook = user
          # else:
            # rpta1 = 'Disculpa no te entendí!'
            cda = '{"respuesta_tipo": [{"tipo": "no-entendi","rpta": [{"respueta_sl_texto": "null"}]}]}'
            rpta1 = base64.b64encode(cda.encode('utf-8'))
            return HttpResponse(rpta1,'utf-8') 
      else:
        rpta_final = "Espero haber atendido tus dudas"
        return HttpResponse(str(rpta_final))
  return HttpResponse(str('ok'))

# def getjson(request):
#   if request.GET['json_rpt']:
#     estado_rpta = request.GET.get('estado')
#     json_rpt = request.GET.get('json_rpt')
#     json_nombre = request.GET.get('json_nombre')
#     id_empresa = request.GET.get('id_empresa')
#     id_user_create = request.GET.get('id_usu')
#     nombre_bd = request.GET.get('nombre_bd')
#     id_registro = request.GET.get('id_registro')
#     arrayRecibido = json.loads(json_rpt)

#     print("estado_rpta:",estado_rpta)
#     print("json_rpt:",json_rpt)
#     print("json_nombrewww:",json_nombre)
#     print("id_empresa:",id_empresa)
#     print("id_user_create:",id_user_create)
#     print("nombre_bd:",nombre_bd)
#     print("id_registro:",id_registro)
#     print("arrayRecibidoarrayRecibido:",arrayRecibido)

#     # 1. Eliminamos el json para reemplazar
#     # with os.scandir(ruta_actual + '/empresa_'+id_empresa) as ficheros:
#     #     for fichero in ficheros:
#     #       if fichero.name == nombre_bd+'_'+id_empresa+'.json':
#     #         eliminar = ruta_actual + '/empresa_'+id_empresa+'/'+fichero.name
#     #         os.remove(eliminar)
#     #         print("ELIMINADO")

#     # # 2. Eliminamos la base de datos para entrenar con los nuevos datos
#     # bd_deleted = os.path.join(BASE_DIR)
#     # delee = bd_deleted+"/"+"midbaprendida_"+id_user_create+".sqlite3"
#     # os.remove(delee)
#     # print("ELIMINADO BD")

#     # # 3. Crea el nuevo archivo JSON
#     # arrayRecibido = json.loads(json_rpt)
#     # #Editamos
#     # datasetpreguntas.objects.filter(pk=id_registro).update(nombre=json_nombre,conversacion=json_rpt)
#     # data = {}
#     # data["conversations"] = []
#     # for x in range(0,len(arrayRecibido)):
#     #     data['conversations'].append({
#     #       'messages': arrayRecibido[x][0]['preguntas_new'],
#     #       'response': arrayRecibido[x][0]['respuesta_new'],
#     #     })
#     # with open(ruta_actual+'/empresa_'+id_empresa+'/'+json_nombre+'_'+id_empresa+'.json', 'w', encoding='utf8') as file:
#     #     json.dump(data, file, indent=4,ensure_ascii=False)

#     # # 4. Entrena y crea la nueva base de datos
#     # conversation_directory(id_empresa)
#     # initialize(id_user_create)
#     # train_bot(load_conversations())

#   return render(request, 'chatbot_admin/layouts/inicio.html')

def getjson(request):
  if request.GET['json_rpt']:
    estado_rpta = request.GET.get('estado')
    json_rpt = request.GET.get('json_rpt')
    json_nombre = request.GET.get('json_nombre')
    id_empresa = request.GET.get('id_empresa')
    id_user_create = request.GET.get('id_usu')
    nombre_bd = request.GET.get('nombre_bd')
    id_registro = request.GET.get('id_registro')


    if estado_rpta == "Registrar":
      # CREAR EL ARCHIVO JSON
      # arrayRecibido = json.loads(json_rpt)
      arrayRecibido = json.loads(json_rpt, strict=False)
      print("nombre_bdarrayRecibido:",arrayRecibido)
      set_datosAdd = datasetpreguntas(nombre=json_nombre,conversacion=json_rpt,id_cliente=cliente.objects.get(pk=id_empresa))
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

    if estado_rpta == "Editar":
      # 1. Eliminamos el json para reemplazar
      with os.scandir(ruta_actual + '/empresa_'+id_empresa) as ficheros:
          for fichero in ficheros:
            if fichero.name == nombre_bd+'_'+id_empresa+'.json':
              eliminar = ruta_actual + '/empresa_'+id_empresa+'/'+fichero.name
              os.remove(eliminar)
              print("ELIMINADO")

      # 2. Eliminamos la base de datos para entrenar con los nuevos datos
      bd_deleted = os.path.join(BASE_DIR)
      delee = bd_deleted+"/"+"midbaprendida_"+id_user_create+".sqlite3"
      os.remove(delee)
      print("ELIMINADO BD")

      # 3. Crea el nuevo archivo JSON
      arrayRecibido = json.loads(json_rpt)
      #Editamos
      datasetpreguntas.objects.filter(pk=id_registro).update(nombre=json_nombre,conversacion=json_rpt)
      data = {}
      data["conversations"] = []
      for x in range(0,len(arrayRecibido)):
          data['conversations'].append({
            'messages': arrayRecibido[x][0]['preguntas_new'],
            'response': arrayRecibido[x][0]['respuesta_new'],
          })
      with open(ruta_actual+'/empresa_'+id_empresa+'/'+json_nombre+'_'+id_empresa+'.json', 'w', encoding='utf8') as file:
          json.dump(data, file, indent=4,ensure_ascii=False)

      # 4. Entrena y crea la nueva base de datos
      conversation_directory(id_empresa)
      initialize(id_user_create)
      train_bot(load_conversations())

  return render(request, 'chatbot_admin/layouts/inicio.html')


def getjsondelet(request):
  if request.GET['id_reg']:
    id_reg = request.GET.get('id_reg')
    empresa = request.GET.get('empresa')
    nom = request.GET.get('nom')
    id_usu = request.GET.get('id_usu')

    # 1. Eliminamos el json 
    with os.scandir(ruta_actual + '/empresa_'+empresa) as ficheros:
      for fichero in ficheros:
        if fichero.name == nom+'_'+empresa+'.json':
          eliminar = ruta_actual + '/empresa_'+empresa+'/'+fichero.name
          os.remove(eliminar)
          print("Eliminado")

    # 2. Eliminar el registro
    record = datasetpreguntas.objects.get(pk = id_reg)
    record.delete()
    print("Registro eliminado")
 
    # 3. Eliminamos la base de datos para entrenar con los nuevos datos
    bd_deleted = os.path.join(BASE_DIR)
    delee = bd_deleted+"/"+"midbaprendida_"+id_usu+".sqlite3"
    os.remove(delee)
    print("Eliminado BD")

    # 4. Entrena y crea la nueva base de datos
    conversation_directory(empresa)
    initialize(id_usu)
    train_bot(load_conversations())
    print("Entrenado")

    return HttpResponse(str("EliminadoOk"))
  
'''=============================================
  RECIBIENDO RANGO DE FECHAS
============================================= '''
class historialChatApiView(APIView):
  def get(self, request, format=None):
    desde = request.GET.get('desde')
    hasta = request.GET.get('hasta')
    id_empresa = request.GET.get('id_empresa')
    #POSTGRESQL
    rpta = chat_user.objects.raw("SELECT DISTINCT ON (nombre_persona) nombre_persona,id,key_session_alias,cliente_empresa_id_id,email_persona,telefono_persona,registrado,pregunta,respuesta FROM historial_chat WHERE cliente_empresa_id_id="+str(id_empresa)+" AND  registrado BETWEEN SYMMETRIC '"+str(desde)+"' AND '"+str(hasta)+"'")
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

    print('serializeree :',serializer)

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


'''=============================================
   ERROR 404
============================================= '''
def error404(request,exception):
  return render(request, 'chatbot_admin/layouts/404.html')




def personalizar_edit(request):

    try:
        json_datos = request.GET.get('datos')
        arrayRecibido = json.loads(json_datos)

        if arrayRecibido[0]['tipo_color_header']=="paleta":
          rpta_chatbot_color = "#"+arrayRecibido[0]['rpta_color_header']
        if arrayRecibido[0]['tipo_color_header']=="personalizado":
          rpta_chatbot_color = arrayRecibido[0]['rpta_color_header'].replace('*','#')
          

        if arrayRecibido[0]['tipo_color_botones']=="paleta":
          rpta_botones_color = "#"+arrayRecibido[0]['rpta_color_botones']
        if arrayRecibido[0]['tipo_color_botones']=="personalizado":
          rpta_botones_color = arrayRecibido[0]['rpta_color_botones'].replace('*','#')


        id_empresa = cliente.objects.get(pk=arrayRecibido[0]['id_empresa_cliente'])
        chatbot_style.objects.filter(id_empresa_cliente=id_empresa).update(
          titulo_cuerpo=arrayRecibido[0]['titulo_cuerpo'],
          nombre_chatbot=arrayRecibido[0]['nombre_chatbot'],
          terminos_y_condiciones=arrayRecibido[0]['terminos_condiciones'],
          terminos_y_condiciones_aceptar=arrayRecibido[0]['t_y_c_aceptar'],
          terminos_y_condiciones_link=arrayRecibido[0]['terminos_condiciones_link'],
          terminos_y_condiciones_rechazar=arrayRecibido[0]['t_y_c_rechazar'],
          tipo_color_header=arrayRecibido[0]['tipo_color_header'],
          rpta_color_header=rpta_chatbot_color,
          tipo_color_botones=arrayRecibido[0]['tipo_color_botones'],
          rpta_color_botones=rpta_botones_color,
          )
        rpta = str("ok")
    except Exception as inst:
      rpta = str("nook")

    return HttpResponse(rpta)



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

  def guardarlogochatbot(request):
    if request.method == 'POST':
      try:
          upload = request.FILES['file']
          fss = FileSystemStorage()
          file = fss.save('logo_chatbot/' + upload.name, upload)
          empresa_id = request.POST.get('empresa_id')
          #ACTUALIZAMOS
          id_empresa = cliente.objects.get(pk=empresa_id)
          chatbot_style.objects.filter(id_empresa_cliente=id_empresa).update(
            foto_logo=file,
          )
          rpta = str("ok")
      except Exception as inst:
          rpta = str("nook")

      return HttpResponse(rpta)


class obtener_prg(HttpRequest):
  def getprg(request):
    if request.GET['prg']:
      empr = request.GET.get('prg')
      rpta_prg = datasetpreguntas.objects.filter(pk=empr)
      return HttpResponse(str(empr))  

      
'''=============================================
   EDITAR SET DATA
============================================= '''
class data__set_all(APIView):
    def get(self, request, format=None):
    
      id__pregunta = request.GET.get('prg')
      rpta_pr = datasetpreguntas.objects.filter(pk=id__pregunta)

      serializer_historial = datasetSerializers(rpta_pr, many=True)

      return Response(serializer_historial.data)
      
'''=============================================
   ELIMINAR HISTORIAL POR CHAT
============================================= '''
def delete___chat(request):
  if request.GET['id']:
    id__his = request.GET.get('id')
    print("id__his :",id__his)
    # 2. Eliminar el registro
    record = chat_user.objects.filter(nombre_persona = str(id__his))
    record.delete()
    print("Registro eliminado")

    return HttpResponse(str("ChatEliminado")) 
      
def all_chat_ver(request):
  if request.GET['id']:
    id__his = request.GET.get('id')
    # record = chat_user.objects.filter(nombre_persona=str(id__his)).filter(estado_chat='novisto').count()
    record = chat_user.objects.filter(nombre_persona=str(id__his), estado_chat='novisto').count()

    return HttpResponse(str(record)) 
      
def visto__chat(request):
  if request.GET['alias']:
    alias = request.GET.get('alias')
    # record = chat_user.objects.filter(nombre_persona=str(id__his)).filter(estado_chat='novisto').count()
    chat_user.objects.filter(nombre_persona=str(alias), estado_chat='novisto').update(estado_chat="visto")
    print("Visto chat")

    return HttpResponse(str("visto")) 

'''=============================================
   REPORTES DE EXPORTAR
============================================= '''

class r_exportar(HttpRequest):

  # FORMATO CSV
  def export_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition']='attachment; filename=Expenses' + \
      str(datetime.datetime.now())+'.csv'

    writer=csv.writer(response)
    # writer.writerow(['#','Campos requeridos','Nombre','Correo Electrónico','Teléfono'])
    writer.writerow(['nombre_persona','email_persona','telefono_persona','nombre_persona_sin_alias','estado_chat'])

    expenses=chat_user.objects.filter()

    print("RPTAAAA  :",expenses)

    for expense in expenses:
        writer.writerow([expense.nombre_persona,expense.email_persona,expense.telefono_persona,expense.nombre_persona_sin_alias,expense.estado_chat])

    return response


  # FORMATO XLS -> pip install xlwt
  # def export_excel(request):
  #   response = HttpResponse(content_type='application/ms-excel')
  #   response['Content-Disposition']='attachment; filename=Expenses' + \
  #     str(datetime.datetime.now())+'.xls'

  #   wb = xlwt.Workbook(encoding='utf-8')
  #   ws = wb.add_sheet('Expenses')
  #   row_num = 0

  #   font_style=xlwt.XFStyle()
  #   font_style.font.bold = True

  #   colums = ['nombre_persona','email_persona','telefono_persona','nombre_persona_sin_alias','estado_chat']

  #   for col_num in range(len(colums)):
  #     ws.write(row_num, col_num, colums[col_num],font_style)

  #   font_style = xlwt.XFStyle()

  #   # rows = chat_user.objects.raw("SELECT DISTINCT ON (nombre_persona) nombre_persona,id,key_session_alias,cliente_empresa_id_id,email_persona,telefono_persona,registrado,pregunta,respuesta FROM historial_chat WHERE cliente_empresa_id_id=5 AND registrado BETWEEN SYMMETRIC '2022-09-10' AND '2022-09-09'")

  #   rows = chat_user.objects.filter().values_list('nombre_persona','email_persona','telefono_persona','nombre_persona_sin_alias','estado_chat')

  #   for row in rows:
  #     row_num+=1

  #     for col_num in range(len(row)):
  #       ws.write(row_num, col_num, str(row[col_num]),font_style)
  #   wb.save(response)

  #   return response




'''=============================================
   API CONFIGURACIONES
============================================= '''
# from rest_framework import viewsets
# from .serializers import ConfiguracionesSerializer
# class ConfiguracionesViewSet(viewsets.ModelViewSet):
#   queryset = configuraciones.objects.all()
#   serializer_class = ConfiguracionesSerializer
#   def get_queryset(self):
#     Configuraciones = configuraciones.objects.all()
#     id_empresa = self.request.GET.get('id')
#     print("MY IDDDD:",id_empresa)
#     if id_empresa:
#       Configuraciones = configuraciones.objects.filter(cliente_empresa_id=cliente.objects.get(pk=id_empresa))
#     return Configuraciones

#   def create(self, request):
#     serializer = self.serializer_class(data=request.data)
#     print("recibiendo_datos123 post :",serializer)
#     if serializer.is_valid():
#       serializer.save()
#       return Response({"message": "Configuración realizada correctamente"}, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#   def update(self, request, pk):

#     serializer = self.serializer_class(data=request.data)

#     print("recibiendo_datos123 :",serializer)

#     return Response({"message": "Haciendo un put correctamente"}, status=status.HTTP_201_CREATED)


    