from django.db import models
from django.contrib.auth.models import User

class Rating(models.Model):
    user = models.CharField(max_length=150)
    rating = models.IntegerField()

    class Meta:
        db_table = 'rating_table'
