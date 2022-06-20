from django.db import models

class CustomUser(models.Model):
    user_name = models.CharField('User name', max_length=64)
    first_name = models.CharField('Name', max_length=64)
    last_name = models.CharField('Surname', max_length=64)
    birthday_year = models.PositiveIntegerField()
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)