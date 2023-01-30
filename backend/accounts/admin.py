from django.contrib import admin
from .models import User

# Register your models here.

@admin.register(User)
class AdminRoom(admin.ModelAdmin):
    list_display = (
        'id',
        'username',
        'email',
        'password',
        'icon',
        'birth',
        'sex',
    )