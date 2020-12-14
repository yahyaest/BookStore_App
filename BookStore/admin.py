from django.contrib import admin
from .models import Book, Order, Profile, Comments
# Register your models here.


class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'author',
                    'genre',
                    'price', 'rate')


class CommentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',
                    'book',
                    'created_at',
                    'like_counter',
                    'dislike_counter')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',
                    'book', 'order_date', 'is_shiped')


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user',
                    'age', 'country')


admin.site.register(Book, BookAdmin)
admin.site.register(Comments, CommentsAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Profile, ProfileAdmin)
