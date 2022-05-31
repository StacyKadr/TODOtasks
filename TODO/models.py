from django.db import models

class CustomUser(models.Model):
    user_name = models.CharField('User name', max_length=64)
    first_name = models.CharField('Name', max_length=64)
    last_name = models.CharField('Surname', max_length=64)
    birthday_year = models.PositiveIntegerField()
    email = models.EmailField(unique=True)

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
    
    def __str__(self):
        return self.description
        