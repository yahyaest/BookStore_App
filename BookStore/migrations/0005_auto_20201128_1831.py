# Generated by Django 3.1 on 2020-11-28 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookStore', '0004_comments_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='dislike_submitter',
            field=models.JSONField(default=['']),
        ),
        migrations.AddField(
            model_name='comments',
            name='like_submitter',
            field=models.JSONField(default=['']),
        ),
    ]
