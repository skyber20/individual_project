from django.shortcuts import render
from django.apps import apps

def individual_achievements_show(request):
    translations = {'mipt': 'МФТИ', 'mgu': 'МГУ', 'mifi': 'МИФИ'}
    sorted_table_names = sorted(translations, key=translations.get)
    data = []
    for table_name in sorted_table_names:
        model = apps.get_model('Individual_achievements', table_name)
        data.append((translations[table_name], model.objects.all()))
    return render(request, 'achievements.html', {'data': data})
