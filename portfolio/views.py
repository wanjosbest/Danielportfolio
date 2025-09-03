from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, logout,login
from .models import Project
from django.core.paginator import Paginator
def index(request):

    return render(request,"index.html")
    
def upload_project(request):
    if request.method == "POST":
        title = request.POST.get("title")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        if title and description and image:
            Project.objects.create(title=title, description=description, image=image)
            return redirect("home") 

    return render(request, "upload_project.html")

def project_list(request):
    project_queryset = Project.objects.all().order_by('-created_at')  
    paginator = Paginator(project_queryset, 6)  # 6 projects per page

    page_number = request.GET.get("page")
    projects = paginator.get_page(page_number)

    return render(request, "project_list.html", {"projects": projects})


# Login
def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("home")  # redirect to homepage
        else:
            messages.error(request, "Invalid username or password")
            return redirect("login")

    return render(request, "login.html")


# Logout
def logout_view(request):
    logout(request)
    return redirect("login")