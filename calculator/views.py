from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.apps import apps
import json


def calculator_view(request):
    global all_events
    all_events = {}
    table_names = ['HighEconomicShool', 'baumanka', 'mgu', 'mifi', 'mipt', 'FU']

    for table_name in table_names:
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
        achieve_list = all_events[razdel]
        return render(request, 'calc_achieves_from_bd.html',  {'achieve_list': achieve_list})

        
@csrf_exempt
def send_achieves(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        return JsonResponse({'status': 'success'})
