from django.shortcuts import redirect
from rest_framework_simplejwt.authentication import JWTAuthentication


class MyJWTAuthentication(JWTAuthentication):
    print('--------')

    def authenticate(self, request):
        print('---------11----------')
        # call parent authenticate method to verify token
        user = super().authenticate(request)
        if user is not None:
            # get user ID from JWT payload
            user_id = user[0].id

            # 여기 안에가 지금 작동을 안함... 이거만 되면..? 
            print(' ## YOU ARE INSIDE MY-JWT-AUTHENTICATION') 


            # redirect user to profile page
            print(user)
            print(user_id)
            return (user, redirect(f'/apiv01/userView/mainProfile/{user_id}'))
        else:
            return user
    
