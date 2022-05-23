# Generated by Django 3.2.13 on 2022-05-20 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=64, verbose_name='User name')),
                ('first_name', models.CharField(max_length=64, verbose_name='Name')),
                ('last_name', models.CharField(max_length=64, verbose_name='Surname')),
                ('birthday_year', models.PositiveIntegerField()),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
    ]
