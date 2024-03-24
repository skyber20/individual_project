from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.apps import apps
from Individual_achievements.views import translations
import json


def calculator_view(request):
    global all_events
    all_events = {}

    for table_name in translations:
        model = apps.get_model('Individual_achievements', table_name)
        queryset = model.objects.all()
        for event in queryset:
            if 'олимпиад' in event.event:
                if 'Олимпиады' not in all_events:
                    all_events.setdefault('Олимпиады', [])
                all_events['Олимпиады'].append(event.type_of_event.strip())
            elif 'Другие' in event.event:
                if 'Другие' not in all_events:
                    all_events.setdefault('Другие', [])
                all_events['Другие'].append(event.type_of_event.strip())
            elif 'Спортивные' in event.event:
                if 'Спортивные' not in all_events:
                    all_events.setdefault('Спортивные', [])
                all_events['Спортивные'].append(event.type_of_event.strip())

    return render(request, 'calculator_ID.html')


@csrf_exempt
def get_achievements(request):
    if request.POST:
        razdel = request.POST.get('razdel')
        achieve_list = sorted(set(all_events[razdel]))
        return render(request, 'calc_achieves_from_bd.html',  {'razdel': razdel, 'achieve_list': achieve_list, 'counter': len(achieve_list)})

        
@csrf_exempt
def send_achieves(request):
    if request.POST:
        selected_achieves = json.loads(request.POST.get('selected_achieves')) 
        calculated_for_vuzes = {}

        for vuz, perevod in translations.items():
            vuz_data = apps.get_model('Individual_achievements', vuz)
            all_score = 0
            for name, status in selected_achieves.items():
                try:
                    achieve_info = vuz_data.objects.filter(type_of_event=name)
                except:
                    pass
                else:
                    if achieve_info:
                        for i in achieve_info:
                            score = eval(f'i.{status}')
                            if str(score).isdigit():
                                all_score += int(score)
            
            if all_score:
                calculated_for_vuzes[perevod] = all_score if all_score <= 10 else 10

        print(calculated_for_vuzes)
