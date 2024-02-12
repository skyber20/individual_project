from django.db import models
from django.contrib.auth.models import User

class Rating(models.Model):
    user = models.CharField(max_length=150)
    rating = models.IntegerField()

    class Meta:
        db_table = 'rating_table'


class FavObject(models.Model):
    fav_object_id = models.AutoField(primary_key=True)
    number_fav_object = models.IntegerField(null=False, default=0)
    vuz = models.CharField(max_length=300, default='none')
    name_fav_object = models.TextField()
    section = models.CharField(max_length=100)

    class Meta:
        db_table='fav_object_info'


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(FavObject)
    
    class Meta:
        db_table = 'user_and_favorites_bd'
