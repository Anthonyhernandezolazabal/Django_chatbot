from django.contrib import admin
from chatbot_admin.models import cliente

class MyClientes(admin.ModelAdmin):
    list_display = ('nombre','direccion','web','residencia','estado')


admin.site.register(cliente,MyClientes)