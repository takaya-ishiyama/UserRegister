from django.views.generic import TemplateView
from .models import User
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, response
from rest_framework.permissions import AllowAny, IsAdminUser

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,) 

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    # permission_classes = (AllowAny,) 

class DeleteUserView(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    # permission_classes = (AllowAny,) 



