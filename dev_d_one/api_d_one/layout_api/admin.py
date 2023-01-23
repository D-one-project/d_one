from django.contrib import admin

# Register your models here.
from .models import Todos, mainFeaturedPost, bodyPost, newsPost

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class mainFeaturedPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'image','imageText','linkText')

class bodyPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'image')

class newsPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'image')
# Register your models here.

admin.site.register(Todos, TodoAdmin)
admin.site.register(mainFeaturedPost, mainFeaturedPostAdmin)
admin.site.register(bodyPost, bodyPostAdmin)
admin.site.register(newsPost, newsPostAdmin)
