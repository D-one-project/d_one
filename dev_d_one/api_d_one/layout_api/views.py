import pprint
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
# from django.template import context

# Create your views here.
from rest_framework import viewsets
from .serializers import TodoSerializer, emailSerializer, mainFeaturedPostSerializer, bodyPostSerializer, newsPostSerializer
from .models import Todos, email, mainFeaturedPost, bodyPost, newsPost

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todos.objects.all()


class mainFeaturedPostView(viewsets.ModelViewSet):
    serializer_class = mainFeaturedPostSerializer
    queryset = mainFeaturedPost.objects.all()

class bodyPostView(viewsets.ModelViewSet):
    serializer_class = bodyPostSerializer
    queryset = bodyPost.objects.all()

class newsPost(viewsets.ModelViewSet):
    serializer_class = newsPostSerializer
    queryset = newsPost.objects.all()
    


class emailView(viewsets.ModelViewSet):
    serializer_class = emailSerializer
    queryset = email.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        print('[Django-ModelViewSet-router] Create')
        print('+++++++++++++++++')
        pprint.pprint(self)
        pprint.pprint(request)
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        print('[Django-ModelViewSet-router] Destroy')
        print('+++++++++++++++++')
        return super().destroy(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        print('[Django-ModelViewSet-router] List')
        print('+++++++++++++++++')
        pprint.pprint(self)
        pprint.pprint(request)
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        print('[Django-ModelViewSet-router] Detail(Retrieve)')
        print('+++++++++++++++++')
        pprint.pprint(self)
        pprint.pprint(request)
        return super().retrieve(request, *args, **kwargs)