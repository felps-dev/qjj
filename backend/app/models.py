from django.db import models

# Create your models here.
class Jogo(models.Model):
  link = models.URLField(verbose_name='Link')
  titulo = models.CharField(verbose_name='Título', max_length=255)
  qt_jogadores = models.PositiveSmallIntegerField(verbose_name='Quantidade de Players', default=0)
  imagem = models.ImageField(verbose_name='Imagem', upload_to='game_images')
  verificado = models.BooleanField(verbose_name='Verificado', default=False)

class FeedBack(models.Model):
  referencia = models.CharField(verbose_name='Referência', max_length=255)
  texto = models.TextField(verbose_name='Texto de Feedback')

