from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

def index(request):
    var_index = {'test_var1':'ya'}
    template_path = 'd_one/index.html'
    return render(request, template_path,var_index)




class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()