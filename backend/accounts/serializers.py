from dataclasses import fields
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'icon',
            'birth',
            'sex',
            'userpolicy',
        )

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user