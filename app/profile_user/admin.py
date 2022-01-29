from django.contrib import admin
from profile_user.models import UserProfile


class myUserProfileAdmin(admin.ModelAdmin):
    list_display = ('username','email','telefono','id_cliente')

admin.site.register(UserProfile,myUserProfileAdmin)