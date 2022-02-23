from rest_framework import serializers
from chatbot.models import chat_user,chatbot_style
class historialChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chat_user
        fields = ['id','pregunta','respuesta','key_session_alias','nombre_persona','cliente_empresa_id','registrado',]

class personalizarChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chatbot_style
        fields = ['id','titulo_header','titulo_cuerpo','botones','text_bienvenida','id_empresa_cliente']