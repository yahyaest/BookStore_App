from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

# For importing images
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    ###  React Routes  ###
    path('books/', TemplateView.as_view(template_name='index.html')),

    ###  Api Routes  ###
    path('api/', include('BookStore.urls')),
    path('', include('accounts.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
