from django.db import models

class Test(models.Model):
    question = models.TextField()
    correct_answer = models.CharField()

    class Meta:
        db_table = 'testing'
