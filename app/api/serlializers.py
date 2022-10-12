from django.db.models import fields
from rest_framework import serializers
from chatbot_admin.models import configuraciones,datasetpreguntas
from chatbot.models import chatbot_style
  
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = configuraciones
        fields = '__all__' #todo los datos

class ItemprgtSerializer(serializers.ModelSerializer):
    class Meta:
        model = datasetpreguntas
        fields = '__all__' #todo los datos
        # fields = ['id','nombre','conversacion','id_cliente','registrado']

class ItemstyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = chatbot_style
        fields = '__all__' #todo los datos
        # fields = ['id','nombre','conversacion','id_cliente','registrado']