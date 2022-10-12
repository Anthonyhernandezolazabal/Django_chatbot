from rest_framework import serializers
from chatbot.models import chat_user,chatbot_style
from chatbot_admin.models import datasetpreguntas,configuraciones,cliente
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
        model = datasetpreguntas
        fields = ['id','nombre','conversacion','id_cliente','registrado']

# class ConfiguracionesSerializer(serializers.ModelSerializer):
#     # nombre_cliente_empresa = serializers.CharField(read_only=True, source="cliente_empresa_id.nombre")
#     def validate_cliente_empresa_id(self, value):
#         existe = configuraciones.objects.filter(cliente_empresa_id=value).exists()
#         # existe = configuraciones.objects.filter(cliente_empresa_id__iexact=value).exists() //comparar entre mayusculas y minusculas

#         if existe:
#             raise serializers.ValidationError("Ya fue registrado")
#         return value
#     class Meta:
#         model = configuraciones
#         fields = '__all__' #todo los datos
      

   
       