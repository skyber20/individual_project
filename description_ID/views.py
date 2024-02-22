from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DescriptionPerechen
from main_page.models import UserProfile


def show_description_ID(request):
    return render(request, 'description_ID.html')


@csrf_exempt
def give_description(request):
    if request.method == 'POST':
        razdel = request.POST.get('razdel')
        user_is_auth = False

        if request.user.is_authenticated:
            try:
                user_profile = UserProfile.objects.get(user=request.user)
                favorites = list(user_profile.favorites.filter(section='description', vuz_or_razdel=razdel).values_list('number_fav_object', flat=True))
                user_is_auth = True
            except UserProfile.DoesNotExist:
                pass

        if razdel == 'Перечневые':
            events = DescriptionPerechen.objects.all()
            if user_is_auth:
                cnt = 1
                for event in events:
                    event.is_favorite = cnt in favorites
                    cnt += 1
        else:
            events = ['Здесь пока пусто']
        return render(request, 'description_from_bd.html', {'events': events})
    else:
        return JsonResponse({'error': 'Произоошла непредвиденная ошибка'})
