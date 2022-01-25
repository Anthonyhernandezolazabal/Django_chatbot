from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User #Modelo usuario ya existe, es el modelo que crea los campos de la tabla usuario
from django import forms

class UserRegisterForm(UserCreationForm):
    username = forms.CharField(label="Nombre de usuario", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Ingresa usuario",'autofocus': ''}))
    email = forms.EmailField(label="Dirección de Correo Electrónico", max_length=128, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Ingresa Correo",'autofocus': ''}))
    password1 = forms.CharField(label="Contraseña", max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control','placeholder': "Ingresa contraseña"}))
    password2 = forms.CharField(label="Confirmar contraseña", max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control','placeholder': "Confirmar contraseña"}))
    
    class Meta: #Donde estará asociada
        model = User #Modelo que esta relacionado
        fields = ["username","email","password1","password2"] #campos que aparezca
        help_text = {k: "" for k in fields} #remover los textos de ayuda 