from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from .models import TODO, Project
from users.models import CustomUser
from .serializers import TODOModelSerializer, ProjectModelSerializer, ProjectSerializerBase
from users.serializers import UserModelSerializer
from .filters import ProjectFilter, TODOFilter
from rest_framework import filters


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    filterset_class = TODOFilter
    pagination_class = TODOLimitOffsetPagination

    def destroy(self, request, pk=None, *args, **kwargs):
        queryset = get_object_or_404(TODO, pk=pk)
        serializer_class = TODOModelSerializer
        queryset.is_active = False
        queryset.save()
        return Response(serializer_class.data, status = 200)


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectSerializerBase

class UserListAPIView(ListAPIView):
    renderer_classes = [JSONRenderer]
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer

class UserUpdateAPIView(UpdateAPIView):
    renderer_classes = [JSONRenderer]
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer

class TODOListView(generics.ListAPIView):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created', 'description']
    ordering = ['created']