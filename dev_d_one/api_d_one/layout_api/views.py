import pprint
from unittest import result
from urllib.parse import quote_from_bytes
from warnings import catch_warnings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
# from django.template import context

# Create your views here.
from rest_framework import viewsets
from .serializers import TodoSerializer, emailSerializer, mainFeaturedPostSerializer, bodyPostSerializer, newsPostSerializer, userSerializer
from .models import Todos, email, mainFeaturedPost, bodyPost, newsPost
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import status


from django.middleware import csrf
from django.http import JsonResponse

def csrf_token_view(request):
    token = csrf.get_token(request)
    return JsonResponse({'csrfToken': token})


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

#waitList
class emailView(viewsets.ModelViewSet):
    serializer_class = emailSerializer
    queryset = email.objects.all()
    permission_classes = [IsAuthenticated]
    # permission_classes = [permissions.AllowAny]

    # permission control per function
    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve']:
            return []
        else:
            print('############# msg: ')
            pprint.pprint(self.__dict__)
            return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        print('** Create [POST]')

        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        print('** Destroy')
        # print('+++++++++++++++++')
        return super().destroy(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        print('** List [GET]')
        # print('+++++++++++++++++')
        # pprint.pprint(self)
        # pprint.pprint(request)
        return super().list(request, *args, **kwargs)

    # @login_required
    def retrieve(self, request, *args, **kwargs):
        print('** Detail(Retrieve)')

        # print('session:', request.session)
        print('request.user:', request.user)
        print('request.auth:', request.auth)
        # print('authenticated?:')
        # print('+++++++++++++++++')
        # pprint.pprint(self)
        # pprint.pprint(request)
        return super().retrieve(request, *args, **kwargs)

class userView(viewsets.ModelViewSet):
    serializer_class = userSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    # permission control per function
    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve']: 
            return []
        else:
            return [IsAuthenticated()]
    # need to create to handle the situation that user's not authenticated.
    # redirect the unauthenticated user to somewhere

    def create(self, request, *args, **kwargs):        
        print('receved data from frontend : ', request.data)
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        print('Retrieve function')
        return super().retrieve(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        print('List function')
        return super().list(request, *args, **kwargs)