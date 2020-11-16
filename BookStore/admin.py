from django.contrib import admin
from .models import Book, Order, Profile, Comments
# Register your models here.
admin.site.register(Book)
admin.site.register(Comments)
admin.site.register(Order)
admin.site.register(Profile)
