from xml.parsers.expat import model
from django.db import models
from chatbot_admin.models import cliente

class chat_user(models.Model):
  pregunta = models.CharField(max_length=100,verbose_name='Escribir mensaje', null=True)
  respuesta = models.TextField(verbose_name='Respuesta', default=None, null=True)
  key_session_alias = models.CharField(max_length=255,verbose_name='Alias usuario', default=None, null=True)
  nombre_persona = models.CharField(max_length=50,verbose_name='Nombre de la persona', null=True)
  email_persona = models.CharField(max_length=100,verbose_name='Correo electrónico de la persona', null=True)
  telefono_persona = models.CharField(max_length=100,verbose_name='Teléfono de la persona', null=True)
  nombre_persona_sin_alias = models.CharField(max_length=50,verbose_name='Nombre de la persona alias', null=True)
  cliente_empresa_id = models.ForeignKey(cliente,on_delete=models.SET_NULL, blank=True, null=True)
  fecha_historial_chat = models.CharField(max_length=255,verbose_name='Fecha de historial', null=True)
  estado_chat = models.CharField(max_length=20,verbose_name='Estado de visto', null=True)
  registrado = models.DateTimeField(auto_now_add=True, null=True)

  class Meta:
    db_table = 'historial_chat'
    ordering = ['id'] #ordenar por ID

class chatbot_style(models.Model):
  foto_logo = models.TextField(verbose_name='foto logo para chatbot', default=None, null=True)
  nombre_chatbot = models.CharField(max_length=20, null=True)
  titulo_cuerpo = models.CharField(max_length=255, null=True)
  terminos_y_condiciones = models.CharField(max_length=120, null=True)
  terminos_y_condiciones_link = models.CharField(max_length=150, null=True)
  terminos_y_condiciones_aceptar = models.CharField(max_length=150, null=True)
  terminos_y_condiciones_rechazar = models.CharField(max_length=150, null=True)
  tipo_color_header = models.TextField(verbose_name='Tipo color del chatbot', null=True)
  rpta_color_header = models.TextField(verbose_name='Respuesta color del chatbot', null=True)
  tipo_color_botones = models.TextField(verbose_name='Tipo color de botones de chatbot', null=True)
  rpta_color_botones = models.TextField(verbose_name='Respuesta color de botones de chatbot', null=True)
  id_empresa_cliente = models.ForeignKey(cliente,on_delete=models.SET_NULL, blank=True, null=True)
  
  class Meta:
    db_table = 'chatbot_estilo'
    ordering = ['id'] #ordenar por ID
