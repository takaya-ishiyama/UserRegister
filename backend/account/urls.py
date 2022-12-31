from django.urls import path, include
from . import views
from django.conf.urls.static import static

app_name='accounts'
urlpatterns=[
    path(r'', views.user_list),
    path(r'<int:pk>/', views.user_detail),
]