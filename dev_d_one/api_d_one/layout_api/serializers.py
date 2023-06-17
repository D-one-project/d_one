from dataclasses import field
from rest_framework import serializers

# from .models import Todos, UserProfile, mainFeaturedPost, bodyPost, newsPost, email
from .models import UserProfile, WaitlistEmail
from django.contrib.auth.models import User


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView


# """
# When you get access token, the code below will return "user.id" along with the token
# """
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     # token returns access and refresh value only. To add more data there, need to customize get_token()
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # the code below is to see what's included in user object using .__dict__ which is a default method by Python
#         # print('Inside token claim[test]: ', user.__dict__) 
#         print('Inside token claim[test]: ', user.id) 

#         # Add custom claims
#         token['user_id'] = user.id
#         # print(' ## new toekn:', token)
#         return token

    # """
    # the serializer's to_representation() method is responsible for serializing the Token instance 
    # into a dictionary that can be passed to jwt.encode(). By default, this method only includes 
    # the standard claims defined by the JWT specification
    # """ 
    # def to_representation(self, token):
    #     data = super().to_representation(token)
    #     data['id'] = token['id']
    #     return data

# """ 
# old test codes that can be removed? 
# """
# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todos
#         fields = ('id', 'title', 'description', 'completed')

# class mainFeaturedPostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = mainFeaturedPost
#         fields = ('title', 'description', 'image', 'imageText','linkText')
# class bodyPostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = bodyPost
#         fields = ('title', 'description', 'image')
# class newsPostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = newsPost
#         fields = ('title', 'description', 'image')



# class with uppercase, convention. need to update
class emailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistEmail
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    # user = userSerializer()

    class Meta:
        model = UserProfile
        fields = '__all__'

# class with uppercase, convention. need to update
class userSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # Insert Profile model's serializer and populate it using "source"
    # Then, userSerializer will have User model instance plus Profile model instance all together
    profile = UserProfileSerializer(source='userprofile', read_only=True)


    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


