from django.db import models

class DescriptionPerechen(models.Model):
    name_event = models.TextField()
    level = models.IntegerField()

    class Meta:
        db_table = 'perechnevie'
