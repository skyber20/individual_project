from django.contrib import admin
from django.urls import path
from main_page.views import show_main_page, show_faq, user_rated, add_to_favorites, remove_from_favorites
from Individual_achievements.views import individual_achievements_show
from calculator.views import calculator_view, get_achievements, send_achieves
from individual_testing.views import show_testing_page, check_answers
from example_ID.views import example_id
from description_ID.views import show_description_ID, give_description_view
from sign_login.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', show_main_page, name='main_page'),
    path('faq/', show_faq, name='show_faq'),
    path('rate/', user_rated, name='rate'),
    path('add_to_favorites/', add_to_favorites, name='add_to_favorites'),
    path('remove_from_favorites/', remove_from_favorites, name='remove_from_favorites'),
    # path('show_favorites/', show_favorites, name='show_favorites'),
    path('individual_achievements_vuz/', individual_achievements_show, name='individual_achievements_vuz'),
    path('description_ID/', show_description_ID, name='description_ID'),
    path('give_description/', give_description_view, name='give_description'),
    path('individual_testing/', show_testing_page, name='individual_testing'),
    path('calculator/', calculator_view, name='calculator'),
    path('get_achievements/', get_achievements, name='get_achievements'),
    path('send_achieves/', send_achieves, name='send_achieves'),
    path('compare_answers/', check_answers, name='compare_answers'),
    path('example_portfolio', example_id, name='example_portfolio'),
    path('sign_up/', sign_up, name='sign_up'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout')
]
