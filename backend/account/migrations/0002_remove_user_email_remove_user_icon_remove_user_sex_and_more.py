# Generated by Django 4.0.5 on 2022-12-22 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='email',
        ),
        migrations.RemoveField(
            model_name='user',
            name='icon',
        ),
        migrations.RemoveField(
            model_name='user',
            name='sex',
        ),
        migrations.RemoveField(
            model_name='user',
            name='userpolicy',
        ),
    ]
