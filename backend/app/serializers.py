from rest_framework import serializers
from app.models import Jogo, FeedBack
from drf_extra_fields.fields import Base64ImageField

class JogoSerializer(serializers.ModelSerializer):
  imagem = Base64ImageField(required=True)
  class Meta:
    model = Jogo
    fields = ('id', 'link', 'titulo', 'qt_jogadores', 'imagem')

class FeedBackSerializer(serializers.ModelSerializer):

  class Meta:
    model = FeedBack
    fields = '__all__'