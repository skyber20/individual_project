from django.shortcuts import render
import json
from django.http import JsonResponse
from .models import AllIndividualAchievements
from django.views.decorators.csrf import csrf_exempt

def calculator_view(request):
    return render(request, 'calculator_ID.html')


def get_achievements(request):
    data = {}
    for category in AllIndividualAchievements.objects.values_list('category', flat=True).distinct():
        achievements = AllIndividualAchievements.objects.filter(category=category).values_list('name_event', flat=True)
        data[category] = list(achievements)
    return JsonResponse(data)


@csrf_exempt
def send_achieves(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        return JsonResponse({'status': 'success'})
