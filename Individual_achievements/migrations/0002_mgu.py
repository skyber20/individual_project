# Generated by Django 5.0 on 2023-12-23 22:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Individual_achievements', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MGU',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.CharField(default='нет информации', max_length=300)),
                ('type_of_event', models.TextField(default='нет информации')),
                ('conditions_for_adding', models.TextField(default='нет информации')),
                ('adding_points_uchastnik', models.CharField(default='нет информации', max_length=100)),
                ('adding_points_prizer', models.CharField(default='нет информации', max_length=100)),
                ('adding_points_pobeditel', models.CharField(default='нет информации', max_length=100)),
                ('adding_points_laureat', models.CharField(default='нет информации', max_length=100)),
            ],
            options={
                'db_table': 'mgu_bd',
            },
        ),
    ]
