import pprint
from unittest import result
from urllib.parse import quote_from_bytes
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

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

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

    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    permission_classes = [permissions.AllowAny]

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

        print('session:', request.session)
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

    def create(self, request, *args, **kwargs):
        print('receved data from frontend : ', request.data)

        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['POST'])
    def login(self, request):
        print('login route in serverside worked')
        print('Data from Frontend(POST): ', request.POST)
        print('Data from Frontend(data): ', request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # A backend authenticated the credentials   
            login(request, user)
            print('user?: ', request.user)
            print('session:', request.session)
            # print('result:', login(request, user))
            print('Logged in successfully.')
            return Response({'message': 'Logged in successfully.'})
        else:
            # No backend authenticated the credentials
            print('Log in failed')
            return Response({'message': 'Log in failed'}, status=400)
        

from django.middleware import csrf
from django.http import JsonResponse

def csrf_token_view(request):
    token = csrf.get_token(request)
    return JsonResponse({'csrfToken': token})