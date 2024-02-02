from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PersonalTest, DetailedAnswers


def show_testing_page(request):
    questions = PersonalTest.objects.all()
    return render(request, 'individual_testing.html', context={'test': questions})


@csrf_exempt
def check_answers(request):
    if request.method == 'POST':
        data_from_site = request.POST.getlist('user_answers[]')
        sum_of_points = sum(map(int, data_from_site))
        data_from_table = DetailedAnswers.objects.all()
        data_to_site = {}

        for data in data_from_table:
            if sum_of_points <= 16:
                data_to_site['fast_res'] = 'командная'
            else:
                data_to_site['fast_res'] = 'индивидуальная'

            if data.start_points <= sum_of_points <= data.end_points:
                data_to_site['detail_res'] = data.answer
                if sum_of_points <= 16:
                    data_to_site['fast_res'] = 'командная'
                else:
                    data_to_site['fast_res'] = 'индивидуальная'
                data_to_site['sum_of_points'] = sum_of_points if sum_of_points else 0
                break
        
        return JsonResponse(data_to_site)
