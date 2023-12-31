from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Test


def show_testing_page(request):
    questions = Test.objects.all()
    return render(request, 'individual_testing.html', context={'test': questions})


@csrf_exempt
def check_answers(request):
    if request.method == 'POST':
        cnt = 0
        user_answers = request.POST.getlist('user_answers[]')
        corrects = Test.objects.values_list('correct_answer', flat=True)
        for user, correct in zip(user_answers, corrects):
            if user == correct:
                cnt += 1
        if cnt >= 6:
            return JsonResponse({'res': 'По результатам тестирования для Вас лучше всего подойдет форма участия: командная'})
        else:
            return JsonResponse({'res': 'По результатам тестирования для Вас лучше всего подойдет форма участия: индивидуальная'})
