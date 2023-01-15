from django.urls import path, include
from . import views
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



app_name='accounts'
urlpatterns=[
    path('api/logout/', views.LogoutView.as_view(), name='auth_logout'),
    path("api/list/", views.UserListView.as_view(), name="user_list"),
    path('api/detail/<int:pk>/', views.UserDetailView.as_view(), name="user_detail"),
    path('api/delete/<int:pk>/', views.DeleteUserView.as_view(), name="user_delete"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]