from django.db import models

class PersonalTest(models.Model):
    question = models.TextField()

    class Meta:
        db_table = 'personal_testing'


class DetailedAnswers(models.Model):
    start_points = models.IntegerField()
    end_points = models.IntegerField()
    answer = models.TextField()

    class Meta:
        db_table = 'detailed_answers'
