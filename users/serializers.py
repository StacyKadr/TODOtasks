from .models import CustomUser
from rest_framework import serializers
class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_name', 'email')

class UserSerializerWithFullName(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_name', 'email', 'is_admin', 'is_active')