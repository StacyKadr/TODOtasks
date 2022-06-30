
from rest_framework.viewsets import ModelViewSet
from .models import CustomUser
from .serializers import UserModelSerializer, UserSerializerWithFullName

class UserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.get_queryset().order_by('id')
    serializer_class = UserModelSerializer
    
    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserSerializerWithFullName
        return UserModelSerializer