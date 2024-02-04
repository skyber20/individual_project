from django.db import models


class CommonTable(models.Model):
    event = models.CharField(max_length=300, default='нет информации')
    type_of_event = models.TextField(default='нет информации')
    conditions_for_adding = models.TextField(default='нет информации')
    adding_points_uchastnik = models.CharField(max_length=100, default='нет информации')
    adding_points_prizer = models.CharField(max_length=100, default='нет информации')
    adding_points_pobeditel = models.CharField(max_length=100, default='нет информации')
    adding_points_laureat = models.CharField(max_length=100, default='нет информации')

    class Meta:
        abstract = True

class Mipt(CommonTable):
    class Meta:
        db_table = 'mipt_bd'

    def __str__(self):
        return 'mipt_bd'
    
class MGU(CommonTable):
    class Meta:
        db_table = 'mgu_bd'
    
    def __str__(self):
        return 'mgu_bd'
    

class Mifi(CommonTable):
    class Meta:
        db_table = 'mifi_bd'

    def __str__(self):
        return 'mifi_bd'
