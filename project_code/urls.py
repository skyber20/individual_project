"""
URL configuration for project_code project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Individual_achievements.views import individual_achievements_show
from main_page.views import show_main_page
from individual_testing.views import show_testing_page, check_answers
from example_ID.views import example_id

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', show_main_page, name='main_page'),
    path('individual_achievements_vuz/', individual_achievements_show, name='individual_achievements_vuz'),
    path('individual_testing/', show_testing_page, name='individual_testing'),
    path('compare_answers/', check_answers, name='compare_answers'),
    path('example_portfolio', example_id, name='example_portfolio')
]
