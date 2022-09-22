from django.db.models import fields
from rest_framework import serializers
from chatbot_admin.models import configuraciones
  
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = configuraciones
        fields = '__all__' #todo los datos
  