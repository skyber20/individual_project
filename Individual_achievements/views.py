from django.shortcuts import render
from django.apps import apps
from main_page.models import UserProfile


def individual_achievements_show(request):
    translations = {'mipt': 'МФТИ', 'mgu': 'МГУ', 'mifi': 'МИФИ'}
    sorted_table_names = sorted(translations, key=translations.get)
    vuzes_data = []
    cnt = 1
    for table_name in sorted_table_names:
        model = apps.get_model('Individual_achievements', table_name)
        queryset = model.objects.all()
        if request.user.is_authenticated:
            try:
                user_profile = UserProfile.objects.get(user=request.user)
                favorites = list(user_profile.favorites.all().values_list('fav_object_id', flat=True))
                for item in queryset:
                    item.is_favorite = int(f'{cnt}{item.id}') in favorites
            except UserProfile.DoesNotExist:
                pass
        vuzes_data.append((translations[table_name], queryset))
        cnt += 1
    return render(request, 'achievements.html', {'vuzes_data': vuzes_data})

