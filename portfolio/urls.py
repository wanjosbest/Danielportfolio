from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="home"),
    path("upload-project/", views.upload_project, name="upload_project"),
     path("daniel-login/", views.login_view, name="login"),
     path("logout/", views.logout_view, name="logout"),
     path("projects/", views.project_list, name="project_list"),
]