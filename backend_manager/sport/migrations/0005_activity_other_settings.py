# Generated by Django 4.1.3 on 2022-11-21 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sport', '0004_remove_personalactivity_seat_setting_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='other_settings',
            field=models.CharField(default='', max_length=200),
        ),
    ]