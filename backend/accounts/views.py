from .models import User
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import viewsets, filters
import jwt
from config import settings

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes = (AllowAny,)

    def get(self, JWT):
        payload = jwt.decode(
            jwt=JWT, key=settings.SECRET_KEY, algorithms=["HS256"]
        )
        return User.objects.get(id=payload["user_id"])

