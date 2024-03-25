from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.apps import apps
from Individual_achievements.views import translations
import json


def calculator_view(request):
    vuzes = [(eng_vuz, rus_vuz) for eng_vuz, rus_vuz in translations.items()]
    vuzes = sorted(vuzes, key=lambda x: x[1])
    return render(request, 'calculator_ID.html', {'vuzes': vuzes})


@csrf_exempt
def get_achieves_from_vuz(request):
    if request.POST:
        vuz_name = request.POST.get('vuz_name')
        all_achieves_from_vuz = apps.get_model('Individual_achievements', vuz_name)
        list_achives = [queryset for queryset in all_achieves_from_vuz.objects.all()]
        return render(request, 'achieves_from_vuz.html', {'data': list_achives})
