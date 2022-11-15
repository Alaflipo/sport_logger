from django.db import models
from django.utils import timezone

import datetime

# Create your models here.

class Activity(models.Model):
    class Type(models.TextChoices): 
        SHOULDER = ("1", "Shoulders")
        CHEST = ("2", "Chest")
        BICEPS = ("3", "Biceps")
        BACK = ("4", "Back")
        BELLY = ("5", "Belly")
        
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    type = models.CharField(
        max_length=2, 
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
    seat_setting = models.IntegerField(default=1)

    def trained_recently(self): 
        return self.date >= timezone.now() - datetime.timedelta(days=1)

    def __str__(self): 
        return f'{self.person.name} doing {self.activity.name} with weight {self.weight}'


