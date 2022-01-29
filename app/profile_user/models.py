from django.db import models
from django.contrib.auth.models import AbstractUser
from chatbot_admin.models import cliente
# from django.contrib.auth.models import AbstractBaseUser
# from django.contrib.auth.models import PermissionsMixin
# from django.contrib.auth.models import BaseUserManager


# class UserProfileManage(BaseUserManager):
#   """ Manage para perfiles de usuario (Especifica funciones para manipular lo que tenemos dentro de nuestros objetos de userprofile"""

#   def create_user(self, email, name, password=None):
#     ''' Crear Nuevo Usuario '''
#     if not email:
#       raise ValueError('Usuario debe tener un Email')

#     email = self.normalize_email(email)
#     user = self.model(email=email, name=name)

#     user.set_password(password)
#     user.save(using=self._db)

#     return user

#   def create_superuser(self, email,name, password):
#     user = self.create_user(email,name,password)

#     user.is_superuser = True
#     user.is_staff = True
#     user.save(using=self._db)

#     return user

# # Modelo personalizado de usuario
class UserProfile(AbstractUser):
  """ Modelo Base de Datos para Usuarios en el Sistema """
  telefono=models.CharField(max_length=12, null=True)
  id_cliente = models.ForeignKey(cliente,on_delete=models.SET_NULL, blank=True, null=True)

  class Meta:
      verbose_name = 'UserProfile'
      verbose_name_plural = 'UserProfiles'
      db_table = 'UserProfile'
      ordering = ['id'] #ordenar por ID
#   email = models.EmailField(max_length=255,unique=True)
#   name = models.CharField(max_length=255)
#   is_active = models.BooleanField(default=True) #Cada usuario creado sera activo
#   is_staff = models.BooleanField(default=False) #Miembro de equipo

#   objects = UserProfileManage()

#   USERNAME_FIELD = 'email' #Campo de login que el usuario va especificar
#   REQUIRED_FIELDS = ['name']# Campos requeridos

#   def get_full_name(self):
#     ''' Obtener nombre completo del usuario '''
#     return self.name

#   def get_short_name(self):
#     ''' Obtener nombre corto del usuario'''
#     return self.name

#   def __str__(self):
#     ''' Retornar cadena representando nuestro usuario '''
#     return self.email