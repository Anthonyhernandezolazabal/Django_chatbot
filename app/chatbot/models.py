from xml.parsers.expat import model
from django.db import models
from django.contrib.sessions.models import Session

class chat_user(models.Model):
  pregunta = models.CharField(max_length=100,verbose_name='Escribir mensaje')
  nombre_alias = models.CharField(max_length=50, verbose_name='nombre_alias', default=None, null=True)
  respuesta = models.CharField(max_length=255,verbose_name='Respuesta', default=None, null=True)
  key_session = models.ForeignKey(Session, on_delete=models.SET_NULL, blank=True, null=True)