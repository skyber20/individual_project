from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DescriptionPerechen


def show_description_ID(request):
    return render(request, 'description_ID.html')


@csrf_exempt
def give_description(request):
    if request.method == 'POST':
        section = request.POST.get('section')
        if section == 'Перечневые':
            events = DescriptionPerechen.objects.all()
        else:
            events = ['Здесь пока пусто']
        return render(request, 'description_from_bd.html', {'events': events})
    else:
        return JsonResponse({'error': 'Произоошла непредвиденная ошибка'})
