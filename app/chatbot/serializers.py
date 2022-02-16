from rest_framework import serializers
from chatbot.models import chat_user
class historialChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chat_user
        fields = ['id','pregunta','respuesta','key_session_alias','nombre_persona','cliente_empresa_id','registrado',]