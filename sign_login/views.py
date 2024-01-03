from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib import messages
from django.shortcuts import render, redirect
from .forms import SignUpForm

def sign_up(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('main_page')
        else:
            for error in form.errors.values():
                messages.error(request, error.as_text())
            return render(request, 'sign_up.html', {'form': form})
    else:
        form = SignUpForm()
        return render(request, 'sign_up.html', {'form': form})

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password1']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('main_page')
        else:
            messages.error(request, 'Неправильный пароль / Имя пользователя')
            return render(request, 'login.html')
    else:
        return render(request, 'login.html')


def logout(request):
    auth_logout(request)
    return redirect('main_page')

def home(request):
    return render(request, 'main.html')
