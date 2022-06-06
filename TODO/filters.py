from django_filters import rest_framework as filters
from .models import Project, TODO
from users.models import CustomUser


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name', 'description', 'users']

class TODOFilter(filters.FilterSet):
    project = filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = TODO
        fields = ['created', 'description', 'users']