from django.contrib import admin
from django.urls import path
from main_page.views import *
from Individual_achievements.views import *
from calculator.views import *
from individual_testing.views import *
from example_ID.views import *
from description_ID.views import *
from sign_login.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', show_main_page, name='main_page'),
    path('faq/', show_faq, name='show_faq'),
    path('user_profile/', show_user_profile, name='user_profile'),
    path('rate/', user_rated, name='rate'),
    path('add_to_favorites/', add_to_favorites, name='add_to_favorites'),
    path('remove_from_favorites/', remove_from_favorites, name='remove_from_favorites'),
    path('show_favorites/', show_favorites, name='show_favorites'),
    path('save_user_data/', save_user_data, name='save_user_data'),
    path('individual_achievements_vuz/', individual_achievements_show, name='individual_achievements_vuz'),
    path('description_ID/', show_description_ID, name='description_ID'),
    path('give_description/', give_description, name='give_description'),
    path('individual_testing/', show_testing_page, name='individual_testing'),
    path('calculator/', calculator_view, name='calculator'),
    path('get_achieves_from_vuz/', get_achieves_from_vuz, name='get_achieves_from_vuz'),
    path('calculate/', calculate, name='calculate'),
    path('compare_answers/', check_answers, name='compare_answers'),
    path('example_portfolio', example_id, name='example_portfolio'),
    path('register/', register_request, name='register'),
    path('login/', login_request, name='login'),
    path('logout/', logout_request, name='logout')
]
