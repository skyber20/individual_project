# Generated by Django 5.0 on 2024-02-06 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0003_achievement_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavObject',
            fields=[
                ('fav_object_id', models.AutoField(primary_key=True, serialize=False)),
                ('number_fav_object', models.IntegerField()),
                ('name_fav_object', models.TextField()),
                ('section', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'fav_object_info',
            },
        ),
        migrations.DeleteModel(
            name='Achievement',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='favorites',
            field=models.ManyToManyField(to='main_page.favobject'),
        ),
    ]