from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from .models import Project, TODO
from users.serializers import UserModelSerializer

class ProjectModelSerializer(serializers.ModelSerializer):
    users = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'

class ProjectSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TODOModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'

