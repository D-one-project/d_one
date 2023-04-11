from dataclasses import field
from rest_framework import serializers
from .models import Todos, mainFeaturedPost, bodyPost, newsPost, email
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ('id', 'title', 'description', 'completed')

class mainFeaturedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = mainFeaturedPost
        fields = ('title', 'description', 'image', 'imageText','linkText')
class bodyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = bodyPost
        fields = ('title', 'description', 'image')
class newsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = newsPost
        fields = ('title', 'description', 'image')

class emailSerializer(serializers.ModelSerializer):
    class Meta:
        model = email
        fields = '__all__'

class userSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

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