from xml.parsers.expat import model
from django.db import models
from django.contrib.sessions.models import Session
from chatbot_admin.models import cliente

class chat_user(models.Model):
  pregunta = models.CharField(max_length=100,verbose_name='Escribir mensaje')
  respuesta = models.CharField(max_length=255,verbose_name='Respuesta', default=None, null=True)
  key_session = models.ForeignKey(Session, on_delete=models.SET_NULL, blank=True, null=True)
  nombre_persona = models.CharField(max_length=50,verbose_name='Nombre de la persona', null=True)
  cliente_empresa_id = models.ForeignKey(cliente,on_delete=models.SET_NULL, blank=True, null=True)

  class Meta:
    db_table = 'historial_chat'
    ordering = ['id'] #ordenar por ID