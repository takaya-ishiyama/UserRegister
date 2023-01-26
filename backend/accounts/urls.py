from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.views import UserViewSet
from rest_framework.routers import DefaultRouter

app_name='accounts'

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns=[
    path('api/detail/', views.UserDetailView.as_view(), name="user_detail"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/", include(router.urls)),
]