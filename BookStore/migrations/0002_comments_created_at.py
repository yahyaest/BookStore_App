# Generated by Django 3.1 on 2020-11-25 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookStore', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default='2002-11-11 15:00:00'),
            preserve_default=False,
        ),
    ]
