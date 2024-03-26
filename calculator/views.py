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
    

@csrf_exempt
def calculate(request):
    if request.POST:
        translation_status = {
            'adding_points_uchastnik': 'Участник',
            'adding_points_prizer': 'Призёр',
            'adding_points_pobeditel': 'Победитель',
            'adding_points_laureat': 'Лауреат'
        }
        eng_name_vuz = request.POST.get('eng_name_vuz')
        all_chosen_achieves = json.loads(request.POST.get('all_chosen_achieves'))
        vuz_achieves = apps.get_model('Individual_achievements', eng_name_vuz)
        calculated_info = []
        summa = 0

        for id_chosen_achieve, status in all_chosen_achieves.items():
            vuz_achieve = vuz_achieves.objects.get(id=int(id_chosen_achieve))
            ball = eval(f'vuz_achieve.{status}')

            if str(ball).isdigit():
                if summa < 10:
                    summa += int(ball)
                else:
                    summa = 10
                calculated_info.append((vuz_achieve, translation_status[status], ball))

        return render(request, 'calculated_info.html', {'summa': summa, 'calculated_achieves': calculated_info})
