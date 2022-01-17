from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic

#A traves de clases
# class HomeChatbot(generic.TemplateView):
#     template_name = 'chatbot/index.html'

#A traves de funciones
def HomeChatbot(request):
  return render(request, 'chatbot/index.html')
