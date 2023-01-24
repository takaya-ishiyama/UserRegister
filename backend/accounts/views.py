from django.views.generic import TemplateView
from .models import User
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from rest_framework import generics, response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import viewsets, filters
import jwt
from config import settings
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
# from .serializers import TokenObtainPairSerializer #追加

# class ObtainTokenPairWithColorView(TokenObtainPairView):
#     serializer_class = TokenObtainPairSerializer

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    # queryset = User.objects.all()
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

# class DeleteUserView(generics.RetrieveDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = (IsAuthenticated,)
#     # permission_classes = (AllowAny,) 

# class LogoutView(APIView):
#     permission_classes = (IsAuthenticated,)

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh_token"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()

#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes = (IsAuthenticated,)

    # @action(detail=True, methods=['get'])
    def get(self, JWT):
        payload = jwt.decode(
            jwt=JWT, key=settings.SECRET_KEY, algorithms=["HS256"]
        )
        return User.objects.get(id=payload["user_id"])


class Login(APIView):
    authentication_classes = [User,]


