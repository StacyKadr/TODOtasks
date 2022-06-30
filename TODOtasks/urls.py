from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from users.views import UserModelViewSet
from TODO.views import TODOModelViewSet, ProjectModelViewSet, UserListAPIView, TODOListView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('TODO', TODOModelViewSet)
router.register('projects', ProjectModelViewSet)

filter_router = DefaultRouter()
#filter_router.register('TODOlist', TODOListView)

schema_view = get_schema_view(
    openapi.Info(
        title="TODOs",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('projects_list', ProjectModelViewSet.as_view({'get': 'list'})),
    path('filters', include(filter_router.urls)),
    path('api-token-auth/', views.obtain_auth_token),

    re_path(r'^api/(?P<version>\d\.\d)/users/$', UserModelViewSet.as_view({'get': 'list'})),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
