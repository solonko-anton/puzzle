from django.urls import path
from .views import FileView


urlpatterns = [
    path('upload-file/', FileView.as_view())
]
