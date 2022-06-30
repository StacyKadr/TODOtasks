import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from users.views import UserModelViewSet
from .models import Project

class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'user_name': 'User_User', 'birthday_year': 2000}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'user_name': 'User_User', 'birthday_year': 2000}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(username='User_User')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(username='User_User')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'username':'User_User1'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestProjectViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(user_name='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'Homework', 'user': project.users.all()})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name,'Homework')

    def test_get_detail_mixer(self):
        project = mixer.blend(Project, name='Homework')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['name'], 'Homework')