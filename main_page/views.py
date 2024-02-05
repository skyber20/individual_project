from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import Rating, Achievement, UserProfile

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
        achievement_id = request.POST.get('achievement_id')
        try:
            achievement = Achievement.objects.get(pk=achievement_id)
            user_profile = UserProfile.objects.get(user=request.user)
            user_profile.favorites.add(achievement)
            return JsonResponse({'status': 'success'})
        except Achievement.DoesNotExist:
            return JsonResponse({'status': 'fail', 'error': 'Achievement does not exist'})
    else:
        return JsonResponse({'status': 'fail'})

@csrf_exempt
@login_required
def remove_from_favorites(request):
    if request.method == 'POST':
        achievement_id = request.POST.get('achievement_id')
        try:
            achievement = Achievement.objects.get(pk=achievement_id)
            user_profile = UserProfile.objects.get(user=request.user)
            user_profile.favorites.remove(achievement)
            return JsonResponse({'status': 'success'})
        except Achievement.DoesNotExist:
            return JsonResponse({'status': 'fail', 'error': 'Achievement does not exist'})
    else:
        return JsonResponse({'status': 'fail'})
    

@csrf_exempt
@login_required
def show_favorites(request):
    if request.method == 'POST':
        section = request.POST.get('section')
        user_profile = UserProfile.objects.get(user=request.user)
        favorites = user_profile.favorites.filter(category=section)
        favorites_data = [{'id': fav.achievement_id, 'name': fav.name} for fav in favorites]
        print(favorites_data)
        return JsonResponse({'favorites': favorites_data})
    else:
        return JsonResponse({'status': 'fail'})
