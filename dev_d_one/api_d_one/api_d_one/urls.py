"""api_d_one URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from layout_api import views #, mainFeaturedPostView, bodyPostView, newsPost
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework.authtoken import views as viewsAuthToken # Default DRF authentication (JWT auth)
from layout_api.views import CustomAuthToken 

# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


#Yea!
router = routers.DefaultRouter()
router.register(r'emailView', views.WaitlistEmailView, 'emailViewTest') # third argument ..what for..?
router.register(r'userView', views.userView,'userView')
router.register(r'userProfileView', views.UserProfileView, 'userProfileView')



urlpatterns = [
    path('admin/', admin.site.urls) , 
    path('apiv01/', include(router.urls)), # it provides GET, POST, DELETE, etc automatically by rest_framework
    path('apiv01/csrf/', views.csrf_token_view, name='csrf_token'),

    # path('api/token/', viewsAuthToken.obtain_auth_token),
    path('api/token/', CustomAuthToken.as_view()),
    path('api/test/', views.login_view)


    # as_view({'get': 'custom_action'})

    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # not... in use
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # not... in use

]#+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



for d in router.urls:
    print('**** urls ****', d)
