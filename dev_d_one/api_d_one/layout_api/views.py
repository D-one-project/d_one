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
from rest_framework import viewsets, status
# from .serializers import TodoSerializer, emailSerializer, mainFeaturedPostSerializer, bodyPostSerializer, newsPostSerializer
from .serializers import UserProfileSerializer, emailSerializer
# from .serializers import userProfileSerializer
from .serializers import userSerializer
# from .models import Todos, UserProfile, email, mainFeaturedPost, bodyPost, newsPost
from .models import UserProfile, WaitlistEmail
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.exceptions import AuthenticationFailed


from django.middleware import csrf
from django.http import JsonResponse


def csrf_token_view(request):
    token = csrf.get_token(request)
    return JsonResponse({'csrfToken': token})


# """
# To send the access token to the front-end as part of the authentication response, 
# you can modify the view that handles the authentication form submission to include the access token 
# as part of the response data, like this:
# """
# from rest_framework_simplejwt.views import TokenObtainPairView
# from .serializers import MyTokenObtainPairSerializer

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         access_token = response.data.get('access_token')
#         user_id = response.data.get('user_id')
#         response.data = {
#             'access_token': access_token,
#             'user_id': user_id,
#         }
#         return response

# #  -->>>>> you should get user_id from the object containing access key token. if not? ....

# class TodoView(viewsets.ModelViewSet):
#     serializer_class = TodoSerializer
#     queryset = Todos.objects.all()


# class mainFeaturedPostView(viewsets.ModelViewSet):
#     serializer_class = mainFeaturedPostSerializer
#     queryset = mainFeaturedPost.objects.all()

# class bodyPostView(viewsets.ModelViewSet):
#     serializer_class = bodyPostSerializer
#     queryset = bodyPost.objects.all()

# class newsPost(viewsets.ModelViewSet):
#     serializer_class = newsPostSerializer
#     queryset = newsPost.objects.all()

#waitList
class WaitlistEmailView(viewsets.ModelViewSet):
    serializer_class = emailSerializer
    queryset = WaitlistEmail.objects.all()

    # 6/26 추가한부분 - 여기서 로그인이 되었는지를 확인함 authenticate() 를 실행하는거나 마찬가지
    # it will check if a user is authenticated using Token (see the connection in settings.py)
    # it's like running authenticate() method provided by Django
    authentication_classes = [TokenAuthentication]
    # For now, it may not be needed, but
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
        print('---## req.user: ', request.user)
        print('---## req.auth: ', request.auth)
        return super().list(request, *args, **kwargs)

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
    queryset = User.objects.all() # Django default User model
    
    permission_classes = [IsAuthenticated]

    # permission control per function
    def get_permissions(self):
        if self.action in ['create', 'list']: 
            return []
        else:
            return [IsAuthenticated()]
            
    # need to create to handle the situation that user's not authenticated.
    # redirect the unauthenticated user to somewhere

    # POST - Backend/apiv01/userView/ - signup page's logic
    def create(self, request, *args, **kwargs):        
        print('receved data from frontend : ', request.data)
        return super().create(request, *args, **kwargs)

    # GET - Backend/apiv01/userView/{id} - load user's information logic
    def retrieve(self, request, *args, **kwargs):
        print('Retrieve function')
        return super().retrieve(request, *args, **kwargs)

    # Load users list
    def list(self, request, *args, **kwargs):
        print('List function')
        print('requrest:', request)
        return super().list(request, *args, **kwargs)
    
    # Update user (not user's profile, just user data)
    # With the received username and password, it will update user data.. it may need to change password?
    def update(self, request, *args, **kwargs):
        print(request.data)
        # print(self)
        # return super().update(request, *args, **kwargs) 
        return Response('')
    
class UserProfileView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    # If not authenticated, any of the functions beow will not run. 
    # But, currently, if authenticated, user can see other people's data as well using postman, need to improve!
    permission_classes = [IsAuthenticated] 

    # def get_permissions(self):
    #     return super().get_permissions()

    def create(self, request, *args, **kwargs):
        print('request.data: ', request.data)
        # return Response('nothing~')
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        print('request.data: ', request.data)

        request.data['user'] = request.user.id
        print('updated request.data:', request.data)

        return super().update(request, *args, **kwargs)
            
    # def partial_update(self, request, *args, **kwargs):
    #     print('axios.patch will put you here in')
    #     print(request.data)
    #     print('user:', request.user)
    #     print('auth:', request.auth)
    #     return super().partial_update(request, *args, **kwargs)

    
# test purpose view
def login_view(request):
    if request.method == 'GET':
        print('###$$$## Login view function! gET')

    return(HttpResponse('Okay~ ByE~'))



from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class CustomAuthToken(ObtainAuthToken):
    print('-- CustomAuthToken View')

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # token = Token.objects.get_or_create(user=user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk
        })