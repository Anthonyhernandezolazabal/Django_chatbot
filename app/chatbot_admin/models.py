from django.db import models
from django.contrib.auth.models import User

class cliente(models.Model):
    nombre = models.CharField(max_length=255, verbose_name='Nombre de empresa')
    direccion = models.CharField(max_length=255, verbose_name='Dirección')
    web = models.CharField(max_length=255, verbose_name='Página web')
    avatar = models.ImageField(upload_to='avatar/%Y/%m/%d', null=True, blank=True)
    residencia = models.CharField(max_length=255, verbose_name='Residencia')
    estado = models.BooleanField(default=True)
    registrado = models.DateTimeField(auto_now_add=True)
    id_user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)

    def _str_(self):
        return self.nombre

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
        db_table = 'cliente'
        ordering = ['id'] #ordenar por ID