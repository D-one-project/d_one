from types import CoroutineType
from django.contrib.auth.models import User
from enum import unique
from pickle import TRUE
from django.db import models

# Create your models here.

# class Todos(models.Model):
#     title = models.CharField(max_length=120)
#     description = models.TextField()
#     completed = models.BooleanField(default=False)

#     def _str_(self):
#         return self.title


# class mainFeaturedPost(models.Model):
#     title = models.CharField(max_length=120)
#     description = models.TextField()
#     image = models.TextField()
#     imageText = models.TextField()
#     linkText = models.TextField()

#     def _str_(self):
#         return self.title

# class bodyPost(models.Model):
#     title = models.CharField(max_length=120)
#     description = models.TextField()
#     image = models.TextField()

#     def _str_(self):
#         return self.title

# class newsPost(models.Model):
#     title = models.CharField(max_length=120)
#     description = models.TextField()
#     image = models.TextField()

#     def _str_(self):
#         return self.title

class WaitlistEmail(models.Model):
    email = models.CharField(max_length=120, null=False, blank=False, unique=TRUE)

    def _str_(self):
        return self.email

# one-to-one relationship with User model provided by Django by default
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    bio = models.CharField(max_length=100)
    interest = models.CharField(max_length=100)