from django.shortcuts import render
from django.http import JsonResponse
from .models import DescriptionPerechen

def show_description_ID(request):
    return render(request, 'description_ID.html')

def give_description_view(request):
    if request.method == 'POST':
        section = request.POST.get('section')
        if section == 'Перечневые':
            descriptions = DescriptionPerechen.objects.values()
            content = "".join(f'<div class="card"><h2>{desc["name_event"]}</h2><div class="buttons-block"><p>Уровень: {desc["level"]}</p>\
                  <button onclick="location.href=\'#\'">Подробнее</button><button onclick="location.href=\'#\'">На сайт мероприятия</button></div></div>' for desc in descriptions)
        elif section == 'Другое':
            content = f'<p id="empty-p">Тут пока пусто</p>'
        else:
            content = ''
        return JsonResponse({'content': content})
