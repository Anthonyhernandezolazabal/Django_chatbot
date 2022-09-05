from django.db import models

class cliente(models.Model):
    nombre = models.CharField(max_length=255, verbose_name='Nombre de empresa')
    direccion = models.CharField(max_length=255, verbose_name='Dirección')
    web = models.CharField(max_length=255, verbose_name='Página web')
    avatar = models.ImageField(upload_to='avatar/%Y/%m/%d', null=True, blank=True)
    residencia = models.CharField(max_length=255, verbose_name='Residencia')
    estado = models.BooleanField(default=True)
    registrado = models.DateTimeField(auto_now_add=True)
    rubro=models.CharField(max_length=255,null=True,verbose_name='Rubro de la empresa')
    nombreBD = models.CharField(max_length=50, default=None)

    def _str_(self):
        return self.nombre

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
        db_table = 'cliente'
        ordering = ['id'] #ordenar por ID


class data_set(models.Model):
    nombre = models.CharField(max_length=50, verbose_name='Nombre de la sección json')
    conversacion = models.TextField(verbose_name='Preguntas y respuestas')
    id_cliente = models.ForeignKey(cliente,on_delete=models.SET_NULL, blank=True, null=True)
    registrado = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.nombre

    class Meta:
      db_table = 'data_set'
      ordering = ['id'] #ordenar por ID


class configuraciones(models.Model):
    terminosycondiciones = models.CharField(max_length=255, verbose_name='aceptar terminos y condiciones')
    horariocomercial = models.CharField(max_length=255, verbose_name='Horario comercial')
    h_inicio = models.CharField(max_length=255, verbose_name='hora de inicio', null=True)
    h_cierre = models.CharField(max_length=255, verbose_name='hora de cierre', null=True)
    h_cierre_des = models.CharField(max_length=255, verbose_name='Descripción hora cierre', null=True)
    c_nombre = models.CharField(max_length=255, verbose_name='Campo nombre', null=True)
    c_email = models.CharField(max_length=255, verbose_name='Campo email', null=True)
    c_telefono = models.CharField(max_length=255, verbose_name='Campo teléfono', null=True)
    texto_bienvenida = models.TextField(verbose_name='Texto de bienvenida', null=True)
    cliente_empresa_id = models.ForeignKey(cliente,on_delete=models.SET_NULL, blank=True, null=True)
        
    class Meta:
        db_table = 'configuraciones'
        ordering = ['id'] #ordenar por ID