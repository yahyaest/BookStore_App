from rest_framework import routers
from .api import UserViewSet, BookViewSet, OrderViewSet, ProfileViewSet, CommentsViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet, 'users')
router.register('books', BookViewSet, 'books')
router.register('comments', CommentsViewSet, 'comments')
router.register('orders', OrderViewSet, 'orders')
router.register('profiles', ProfileViewSet, 'profiles')

urlpatterns = router.urls
