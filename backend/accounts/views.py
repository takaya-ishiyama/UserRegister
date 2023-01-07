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
    # permission_classes = [IsAdminUser]

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser]
    permission_classes = (AllowAny,) 

class DeleteUserView(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser]
    permission_classes = (AllowAny,) 

@csrf_exempt
def user_list(request):
    if request.method == 'GET':
        items = User.objects.all()
        serializer = UserSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


# @csrf_exempt
# def user_detail(request, pk):
#     try:
#         item = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = UserSerializer(item)
#         return JsonResponse(serializer.data)

#     elif request.method == 'PUT':
#         data = JSONParser().parse(request)
#         serializer = UserSerializer(item, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)

#     elif request.method == 'DELETE':
#         item.delete()
#         return HttpResponse(status=204)


