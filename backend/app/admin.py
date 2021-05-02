from django.contrib import admin
from app.models import Jogo, FeedBack
from rest_framework.decorators import api_view
# Register your models here.

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo')
    search_fields = ('id', 'titulo')

@admin.register(FeedBack)
class FeedBackAdmin(admin.ModelAdmin):
    list_display = ('id', 'referencia')
    search_fields = ('id', 'referencia')