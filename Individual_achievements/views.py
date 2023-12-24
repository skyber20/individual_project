from django.shortcuts import render
from .models import Mipt, MGU

def individual_achievements_show(request):
    mipt_data = Mipt.objects.all()
    mgu_data = MGU.objects.all()
    context = {
        'mipt_data': mipt_data,
        'mgu_data': mgu_data,
    }

    return render(request, 'achievements.html', context)
