# Generated by Django 5.0 on 2024-02-02 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('individual_testing', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DetailedAnswers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_points', models.IntegerField()),
                ('end_points', models.IntegerField()),
                ('answer', models.TextField()),
            ],
            options={
                'db_table': 'detailed_answers',
            },
        ),
    ]
