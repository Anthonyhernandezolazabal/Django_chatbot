from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User #Modelo usuario ya existe, es el modelo que crea los campos de la tabla usuario
from django import forms

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    password1 = forms.CharField(label='Contraseña',widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirma contraseña',widget=forms.PasswordInput)

    class Meta: #Donde estará asociada
        model = User #Modelo que esta relacionado
        fields = ["username","email","password1","password2"] #campos que aparezca
        help_text = {k: "" for k in fields} #remover los textos de ayuda 
