from django.shortcuts import render
from django.http import JsonResponse


def show_description_ID(request):
    return render(request, 'description_ID.html')


def give_description_view(request):
    if request.method == 'POST':
        section = request.POST.get('section')
        if section == 'Перечневые':
            content = 'Перечневые олимпиады'
        elif section == 'Другое':
            content = 'Другое'
        else:
            content = ''
        return JsonResponse({'content': content})
    
