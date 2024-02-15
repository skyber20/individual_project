from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout, get_user_model
from django.contrib import messages
from django.contrib.auth.models import Group, User
from django.shortcuts import render, redirect
from .forms import NewUserForm


def register_request(request):
    if request.method == 'POST':
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('main_page')
        else:
            for error in form.errors.values():
                messages.error(request, error.as_text())
            return render(request, 'register.html')
    else:
        return render(request, 'register.html')


def login_request(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password1']
        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        if user is not None:
            auth_login(request, user)
            return redirect('main_page')
        else:
            messages.error(request, 'Неправильный пароль/Имя пользователя')
            return render(request, 'login.html')
    else:
        return render(request, 'login.html')


def logout_request(request):
    auth_logout(request)
    return redirect('main_page')
