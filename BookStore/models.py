from django.db import models
from django.contrib.auth.admin import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import string
import random


def generate_unique_key():
    lenght = 10

    while True:
        order_key = ''.join(random.choices(string.ascii_letters, k=lenght))
        if Order.objects.filter(order_key=order_key).count() == 0:
            break

    return order_key

# Create your models here.


class Book(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    summary = models.TextField(max_length=10000)
    about_author = models.TextField(max_length=10000)
    price = models.IntegerField(default=0)
    rate = models.FloatField(default=0.0)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1000)
    like_counter = models.IntegerField(default=0)
    dislike_counter = models.IntegerField(default=0)
    comment_replies = models.JSONField(
        encoder=None, decoder=None, default=[""])

    def __str__(self):
        return self.user.username + self.book.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    order_key = models.CharField(
        max_length=10, default=generate_unique_key, unique=True)
    is_shiped = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username + self.book.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                primary_key=True)
    age = models.IntegerField(default=0)
    country = models.CharField(max_length=100, default='N/A')
    ordered_books = models.JSONField(
        encoder=None, decoder=None, default=[""])
    liked_books = models.JSONField(
        encoder=None, decoder=None, default=[""])

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
