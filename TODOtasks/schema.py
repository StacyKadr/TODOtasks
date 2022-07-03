import graphene
from graphene_django import DjangoObjectType
from users.models import CustomUser
from TODO.models import Project, TODO

class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    
    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    all_projects = graphene.List(ProjectType)
    
    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_TODOs = graphene.List(TODOType)
    
    def resolve_all_TODOs(root, info):
        return TODO.objects.all()


    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None


    TODOs_by_user_id = graphene.List(CustomUserType, id=graphene.Int(required=True))

    def resolve_TODOs_by_user_id(self, info, id):
        TODOs = TODO.objects.all()
        if id:
            TODOs = TODOs.filter(id=id)
        return TODOs

schema = graphene.Schema(query=Query)
