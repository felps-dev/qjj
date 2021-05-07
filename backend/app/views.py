from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from app.serializers import FeedBackSerializer, JogoSerializer
from app.models import Jogo, FeedBack
import random
import requests

class GetClassMixin(viewsets.ModelViewSet):
    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_action_classes[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_action_classes['default']]

class JogoViewSet(GetClassMixin):
  permission_action_classes = {"default": [IsAdminUser], 'create': [AllowAny], 'rolar': [AllowAny], 'info': [AllowAny]}
  serializer_class = JogoSerializer
  queryset = Jogo.objects.all()

  @action(methods=['GET'], detail=True, url_path='rolar', permission_classes=[AllowAny])
  def rolar(self, request, pk):
    # Pegar um jogo aleatório que esteja verificado
    jogos = Jogo.objects.filter(verificado=True, qt_jogadores__gte=pk)
    jogo = random.choice(jogos) if len(jogos) > 0 else None
    return Response(None if jogo is None else JogoSerializer(jogo,context={"request": request}).data, 200)
  
  @action(methods=['GET'], detail=True, url_path='info', permission_classes=[AllowAny])
  def info(self, request, pk):
    # Get info do jogo
    r = requests.get(
        'https://store.steampowered.com/api/appdetails?appids=' + str(pk))
    if (r.status_code != 200):
      return Response('Erro!, verifique o status code.', r.status_code)
    else:
      return Response(r.json(), 200)
  

class FeedBackViewSet(GetClassMixin):
  permission_action_classes = {"default": [IsAdminUser], 'create': [AllowAny]}
  serializer_class = FeedBackSerializer
  queryset = FeedBack.objects.all()
  

