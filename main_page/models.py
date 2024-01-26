from django.db import models

class Rating(models.Model):
    star5 = models.IntegerField(default=0)
    star4 = models.IntegerField(default=0)
    star3 = models.IntegerField(default=0)
    star2 = models.IntegerField(default=0)
    star1 = models.IntegerField(default=0)

    class Meta:
        db_table = 'rating_table'
