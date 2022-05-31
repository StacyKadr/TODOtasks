from rest_framework.viewsets import ModelViewSet
from .models import TODO, Project
from .serializers import TODOModelSerializer, ProjectModelSerializer

class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer