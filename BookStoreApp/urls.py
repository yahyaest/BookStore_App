from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    ###  React Routes  ###

    ###  Api Routes  ###
    path('api/', include('BookStore.urls')),
    path('', include('accounts.urls')),
]
