from BookStore.models import Book, Order, Profile, Comments
from django.contrib.auth.admin import User
from rest_framework import viewsets, permissions
from .serializer import BookSerializer, CommentsSerializer, OrderSerializer, ProfileSerializer, UserSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

# User Viewset


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  #: No permission is required
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    filter_fields = ['username', 'is_superuser']
    ordering_fields = ['username']
    search_fields = ['username', 'email']

    permission_classes = [
        permissions.AllowAny  #: No permission is required
        # permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer


# Book Viewset
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()  #: No permission is required
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_fields = ('genre',)
    ordering_fields = ('username')

    permission_classes = [
        permissions.AllowAny  #: No permission is required
        # permissions.IsAuthenticated
    ]
    serializer_class = BookSerializer

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        author = request.data['author']
        genre = request.data['genre']
        publisher = request.data['publisher']
        date = request.data['date']
        summary = request.data['summary']
        about_author = request.data['about_author']
        rate = request.data['rate']
        Book.objects.create(name=name,
                            author=author,
                            genre=genre,
                            publisher=publisher,
                            date=date,
                            summary=summary,
                            about_author=about_author,
                            rate=rate)

# Comments Viewset


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()  #: No permission is required

    permission_classes = [
        permissions.AllowAny  #: No permission is required
        # permissions.IsAuthenticated
    ]
    serializer_class = CommentsSerializer

# ORDER Viewset


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()  #: No permission is required

    permission_classes = [
        permissions.AllowAny  #: No permission is required
        # permissions.IsAuthenticated
    ]
    serializer_class = OrderSerializer


# Profile Viewset
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()  #: No permission is required

    permission_classes = [
        permissions.AllowAny  #: No permission is required
        # permissions.IsAuthenticated
    ]
    serializer_class = ProfileSerializer
