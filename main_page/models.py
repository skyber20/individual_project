from django.db import models
from django.contrib.auth.models import User

class Rating(models.Model):
    user = models.CharField(max_length=150)
    rating = models.IntegerField()

    class Meta:
        db_table = 'rating_table'



class Achievement(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    number = models.IntegerField(null=False)
    category = models.CharField(max_length=200)
    name = models.CharField(max_length=200)

    class Meta:
        db_table='achievement_info'


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Achievement)

    class Meta:
        db_table = 'user_and_favorites_bd'
