from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import Rating, FavObject, UserProfile

def show_main_page(request):
    ratings = Rating.objects.all()
    count_rates = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
    }

    for rating in ratings:
        mark = str(rating.rating)
        count_rates[mark] += 1

    all_rates = sum(count_rates.values())

    return render(request, 'main.html', {'count_rates': count_rates,
                                         'all_rates': all_rates})


def show_faq(request):
    return render(request, 'faq.html')


def show_user_profile(request):
    return render(request, 'user_profile.html')


@csrf_exempt
@login_required
def user_rated(request):
    if request.method == 'POST':
        rating = request.POST.get('mark')
        if rating is not None:
            rating = int(rating)
            user_rating, created = Rating.objects.get_or_create(user=request.user.username)
            user_rating.rating = rating
            user_rating.save()
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'fail', 'error': 'No rating provided'})
    else:
        return JsonResponse({'status': 'fail'})
    

@csrf_exempt
@login_required
def add_to_favorites(request):
    if request.method == 'POST':
        number_fav_object = request.POST.get('number_fav_object')
        name_fav_object = request.POST.get('name_fav_object')
        section = request.POST.get('section')
        vuz = request.POST.get('vuz')

        fav_obj, created = FavObject.objects.get_or_create(
            number_fav_object=number_fav_object,
            section=section,
            defaults={
                'number_fav_object': number_fav_object,
                'name_fav_object': name_fav_object,
                'section': section,
                'vuz': vuz
            }
        )

        user_profile, created = UserProfile.objects.get_or_create(user=request.user)

        if fav_obj in user_profile.favorites.all():
            return JsonResponse({'status': 'Объект уже записан'})
        else:
            user_profile.favorites.add(fav_obj)
            return JsonResponse({'status': 'Объект успешно записан'})
    else:
        return JsonResponse({'status': ''})
    

@csrf_exempt
@login_required
def remove_from_favorites(request):
    if request.method == 'POST':
        number_fav_object = request.POST.get('number_fav_object')
        section = request.POST.get('section')

        try:
            fav_obj = FavObject.objects.get(number_fav_object=number_fav_object, section=section)
            user_profile = UserProfile.objects.get(user=request.user)
            user_profile.favorites.remove(fav_obj)
            return JsonResponse({'status': 'Объект успешно удалён'})
        except FavObject.DoesNotExist:
            return JsonResponse({'status': 'Такого объекта не существует'})
    else:
        return JsonResponse({'status': 'ошибка'})
    

@csrf_exempt
@login_required
def show_favorites(request):
    if request.method == 'POST':
        razdel = request.POST.get('section')
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            favorites = user_profile.favorites.filter(section=razdel)

            if razdel == 'vuzes':
                favorites_data = [{'number_fav_object': fav.number_fav_object, 'fav_vuz': fav.vuz, 'fav_name': fav.name_fav_object} for fav in favorites]
                favorites_data = sorted(favorites_data, key=lambda x: (x['number_fav_object']))
            else:
                favorites_data = [{ 'number_fav_object': fav.number_fav_object, 'fav_name': fav.name_fav_object} for fav in favorites]
                favorites_data = sorted(favorites_data, key=lambda x: x['number_fav_object'])
        except UserProfile.DoesNotExist:
            favorites_data = []
            return JsonResponse({'favorites': favorites_data})
        return JsonResponse({'favorites': favorites_data})
    else:
        return JsonResponse({'status': 'fail'})
