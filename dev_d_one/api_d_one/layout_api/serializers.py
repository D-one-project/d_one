from rest_framework import serializers
from .models import Todos, mainFeaturedPost, bodyPost, newsPost


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