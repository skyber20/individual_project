from django.contrib import admin
from django.urls import path
from main_page.views import show_main_page, show_faq
from Individual_achievements.views import individual_achievements_show
from calculator.views import calculator_view
from individual_testing.views import show_testing_page, check_answers
from example_ID.views import example_id
from description_ID.views import show_description_ID, give_description_view
from sign_login.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', show_main_page, name='main_page'),
    path('faq/', show_faq, name='show_faq'),
    path('individual_achievements_vuz/', individual_achievements_show, name='individual_achievements_vuz'),
    path('description_ID/', show_description_ID, name='description_ID'),
    path('give_description/', give_description_view, name='give_description'),
    path('individual_testing/', show_testing_page, name='individual_testing'),
    path('calculator/', calculator_view, name='calculator'),
    path('compare_answers/', check_answers, name='compare_answers'),
    path('example_portfolio', example_id, name='example_portfolio'),
    path('sign_up/', sign_up, name='sign_up'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout')
]
