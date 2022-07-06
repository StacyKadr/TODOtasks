from rest_framework.viewsets import ModelViewSet
from .models import CustomUser
from rest_framework import serializers

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_name', 'email')

class UserSerializerWithFullName(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_name', 'email', 'first_name', 'last_name')