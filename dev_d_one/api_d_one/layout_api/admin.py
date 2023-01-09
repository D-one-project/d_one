from django.contrib import admin

# Register your models here.
from .models import Todos

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Todos, TodoAdmin)