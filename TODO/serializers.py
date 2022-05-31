from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, TODO
from users.serializers import UserModelSerializer

class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'
class TODOModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'

