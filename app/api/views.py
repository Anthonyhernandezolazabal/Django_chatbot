from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from chatbot_admin.models import configuraciones,cliente,datasetpreguntas
from .serlializers import ItemSerializer,ItemstyleSerializer,ItemprofileSerializer
from django.shortcuts import render, get_object_or_404
from chatbot.models import chatbot_style
# Create your views here.
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_items': '/',
        'Buscar por empresa': '/?id_empresa=id',
        # 'Search by Subcategory': '/?subcategory=category_name',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/item/pk/delete'
    }
  
    return Response(api_urls)
'''=============================================
   API CONFIGURACIONES
============================================= '''
@api_view(['POST'])
def add_items(request):
    item = ItemSerializer(data=request.data)
  
    # validating for already existing data
    if configuraciones.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
  
    if item.is_valid():
        item.save()
        # return Response(item.data)
        # return Response(item.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Registrado"}, status=status.HTTP_201_CREATED)
        
    else:
        # return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(item.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_items(request):
    id_empresa = request.GET.get('id_empresa')
    if id_empresa:
        items = configuraciones.objects.filter(cliente_empresa_id=cliente.objects.get(pk=id_empresa))
        if items:
            data = ItemSerializer(items, many=True)
            return Response(data.data)
        else:
            return Response({"id":"sindatos"})
    else:
        items = configuraciones.objects.all()
        if items:
            data = ItemSerializer(items, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update_items(request, pk):
    item = configuraciones.objects.get(pk=pk)
    data = ItemSerializer(instance=item, data=request.data)
  
    if data.is_valid():
        data.save()
        # return Response(data.data, status=status.HTTP_201_CREATED)
        return Response({"message": "editado"}, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_items(request, pk):
    item = get_object_or_404(configuraciones, pk=pk)
    item.delete()
    return Response(status=status.HTTP_202_ACCEPTED)

'''=============================================
   API PERSONALIZAR
============================================= '''
@api_view(['GET'])
def view_style_items(request):
    id_empresa = request.GET.get('id_empresa')
    if id_empresa:
        items = chatbot_style.objects.filter(id_empresa_cliente=cliente.objects.get(pk=id_empresa))
        if items:
            data = ItemstyleSerializer(items, many=True)
            return Response(data.data)
        else:
            return Response({"id":"sindatos"})
    else:
        items = chatbot_style.objects.all()
        if items:
            data = ItemstyleSerializer(items, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_style_items(request):
    item = ItemstyleSerializer(data=request.data)
  
    # validating for already existing data
    if chatbot_style.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
  
    if item.is_valid():
        item.save()
        # return Response(item.data)
        # return Response(item.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Registrado"}, status=status.HTTP_201_CREATED)
        
    else:
        # return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(item.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_style_items(request, pk):
    item = chatbot_style.objects.get(pk=pk)
    data = ItemstyleSerializer(instance=item, data=request.data)
  
    if data.is_valid():
        data.save()
        # return Response(data.data, status=status.HTTP_201_CREATED)
        return Response({"message": "editado"}, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

'''=============================================
   API PROFILE
============================================= '''
@api_view(['GET'])
def view_profile_items(request):

    id_empresa = request.GET.get('id_empresa')
    if id_empresa:
        items = cliente.objects.filter(pk=id_empresa)
        if items:
            data = ItemprofileSerializer(items, many=True)
            return Response(data.data)
        else:
            return Response({"id":"sindatos"})
    else:
        items = cliente.objects.all()
        if items:
            data = ItemprofileSerializer(items, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update__profle_items(request, pk):
    item = cliente.objects.get(pk=pk)
    data = ItemprofileSerializer(instance=item, data=request.data)
    if data.is_valid():
        data.save()
        # return Response(data.data, status=status.HTTP_201_CREATED)
        return Response({"message": "editado"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "error"}, status=status.HTTP_404_NOT_FOUND)
          