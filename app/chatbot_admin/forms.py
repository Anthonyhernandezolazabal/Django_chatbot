from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User #Modelo usuario ya existe, es el modelo que crea los campos de la tabla usuario
from django import forms
from chatbot_admin.models import cliente
from profile_user.models import UserProfile

class UserRegisterForm(UserCreationForm):
    username = forms.CharField(label="Nombre de usuario", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control mb-2', 'placeholder': "Ingresa usuario",'autofocus': ''}))
    email = forms.EmailField(label="Dirección de Correo Electrónico", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control mb-2', 'placeholder': "Ingresa Correo",'autofocus': ''}))
    telefono = forms.CharField(label="Número de Contacto", max_length=12, widget=forms.TextInput(attrs={'class': 'form-control mb-2','placeholder': "Ingresa un número de teléfono"}))
    password1 = forms.CharField(label="Contraseña", max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control mb-2','placeholder': "Ingresa contraseña"}))
    password2 = forms.CharField(label="Confirmar contraseña", max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control','placeholder': "Confirmar contraseña"}))
    
    class Meta: #Donde estará asociada
        model = UserProfile #Modelo que esta relacionado
        fields = ["username","email","telefono","password1","password2"] #campos que aparezca
        help_text = {k: "" for k in fields} #remover los textos de ayuda 


class ClientRegisterForm(forms.ModelForm):
    nombre = forms.CharField(label="Nombre de Empresa", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Ingresa nombre",'autofocus': ''}))
    direccion = forms.CharField(label="Direccion", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Ingresa direccion",'autofocus': ''}))
    web = forms.CharField(label="Página web", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': "www.url.com",'autofocus': ''}))
    residencia = forms.CharField(label="Residencia", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Departamento / Provincia / Distrito",'autofocus': ''}))
    class Meta: #Generación de formularios
        model = cliente
    #campos que necesitamos
        # fields = '__all__'  #Todo los campos
        fields = ["nombre","direccion","web","avatar","residencia",'nombreBD']
        # exclude = ('nombre campo')
        widgets = {
            'nombreBD': forms.HiddenInput(),
        }
        