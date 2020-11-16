from django.db import models
from django.contrib.auth.admin import User

# Create your models here.


class Book(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    summary = models.TextField(max_length=1000)
    about_author = models.TextField(max_length=1000)
    rate = models.FloatField(default=0.0)

    def __str__(self):
        return self.name


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1000)

    def __str__(self):
        return self.user.username + self.book.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    is_shiped = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username + self.book.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                primary_key=True)
    age = models.IntegerField()
    country = models.CharField(max_length=100)
    reded_books = models.TextField(max_length=1000)

    def __str__(self):
        return self.user.username
