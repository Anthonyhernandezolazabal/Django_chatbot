from rest_framework import serializers
from chatbot.models import chat_user

class historialChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chat_user
        fields = ['pregunta','respuesta','key_session','nombre_persona','cliente_empresa_id','registrado',]