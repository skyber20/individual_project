# Generated by Django 5.0 on 2023-12-29 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('individual_testing', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='correct_answer',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
