from django.shortcuts import render
from .models import Rating

def show_main_page(request):
    ratings = Rating.objects.all()
    return render(request, 'main.html', {'ratings_data': ratings})


def show_faq(request):
    return render(request, 'faq.html')
