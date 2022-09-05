from django.contrib import admin
from chatbot.models import chat_user

class chat_userAdmin(admin.ModelAdmin):
    list_display = ('pregunta','key_session_alias')

admin.site.register(chat_user,chat_userAdmin)
