from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.
# from .models import Todos, UserProfile, mainFeaturedPost, bodyPost, newsPost, email
from .models import UserProfile, WaitlistEmail

# class TodoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')

# class mainFeaturedPostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'image','imageText','linkText')

# class bodyPostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'image')

# class newsPostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'image')

class WaitlistEmailAdmin(admin.ModelAdmin):
    list_display = ('email',)

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = [UserProfileInline]


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

# Register your models here.
# admin.site.register(Todos, TodoAdmin)
# admin.site.register(mainFeaturedPost, mainFeaturedPostAdmin)
# admin.site.register(bodyPost, bodyPostAdmin)
# admin.site.register(newsPost, newsPostAdmin)
admin.site.register(WaitlistEmail, WaitlistEmailAdmin)
