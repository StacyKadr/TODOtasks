from django.db import models
from users.models import CustomUser

class Project(models.Model):
    name = models.CharField('Project name', max_length=256)
    link = models.CharField('Repository link', max_length=512, unique=True)
    description = models.TextField('Project description', blank=True)
    users = models.ManyToManyField(CustomUser)
    
    def __str__(self):
        return self.description

class TODO(models.Model):
    project = models.ManyToManyField(Project)
    description = models.TextField('Project description', blank=True)
    created = models.DateTimeField('Created date', auto_now_add=True)
    updated = models.DateTimeField('Updated date', auto_now=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    users = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.description
        