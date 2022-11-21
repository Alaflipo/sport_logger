from django.db import models
from django.utils import timezone

import datetime

# Create your models here.


class Activity(models.Model):
    # This is also defined in the front end, so if edited also
    # EDIT FRONTEND
    class Type(models.TextChoices):
        SHOULDER = "Shoulders"
        CHEST = "Chest"
        BICEPS = "Biceps"
        BACK = "Back"
        BELLY = "Belly"

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    seat_setting = models.IntegerField(default=1, blank=True)
    other_settings = models.CharField(max_length=200, blank=True)
    type = models.CharField(
        max_length=100,
        choices=Type.choices,
        default=Type.SHOULDER
    )

    def __str__(self):
        return f'{self.name} of type {self.type}'


class User(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class PersonalActivity(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    person = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField('activity date')
    weight = models.FloatField(default=0)

    def trained_recently(self):
        return self.date >= timezone.now() - datetime.timedelta(days=1)

    def __str__(self):
        return f'{self.person.name} doing {self.activity.name} with weight {self.weight}'
