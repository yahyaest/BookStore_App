# Generated by Django 3.1 on 2020-11-16 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookStore', '0002_comments'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='reded_books',
            new_name='ordered_books',
        ),
        migrations.AlterField(
            model_name='book',
            name='about_author',
            field=models.TextField(max_length=10000),
        ),
        migrations.AlterField(
            model_name='book',
            name='summary',
            field=models.TextField(max_length=10000),
        ),
    ]