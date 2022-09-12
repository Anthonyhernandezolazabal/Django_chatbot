from rest_framework import serializers
from chatbot.models import chat_user,chatbot_style
from chatbot_admin.models import data_set
class historialChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chat_user
        fields = ['id','pregunta','respuesta','key_session_alias','nombre_persona','email_persona','telefono_persona','cliente_empresa_id','registrado','nombre_persona_sin_alias','fecha_historial_chat','estado_chat']

class personalizarChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chatbot_style
        fields = ['id','foto_logo','nombre_chatbot','titulo_cuerpo','terminos_y_condiciones','terminos_y_condiciones_link','terminos_y_condiciones_aceptar','terminos_y_condiciones_rechazar','tipo_color_header','rpta_color_header','tipo_color_botones','rpta_color_botones','id_empresa_cliente']

class datasetSerializers(serializers.ModelSerializer):
    class Meta:
        model = data_set
        fields = ['id','nombre','conversacion','id_cliente','registrado']