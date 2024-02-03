from django.db import models

class AllIndividualAchievements(models.Model):
    category = models.CharField(max_length=100)
    name_event = models.TextField()

    class Meta:
        db_table = 'all_ind_achives'

    def __str__(self):
        return 'all_ind_achieves'
    