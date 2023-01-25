from django.db import models

# Create your models here.

class Todos(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title


class mainFeaturedPost(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    image = models.TextField()
    imageText = models.TextField()
    linkText = models.TextField()

    def _str_(self):
        return self.title

class bodyPost(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    image = models.TextField()

    def _str_(self):
        return self.title

class newsPost(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    image = models.TextField()

    def _str_(self):
        return self.title

