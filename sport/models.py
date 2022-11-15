from django.db import models

# Create your models here.

class Activity(models.Model): 
    name = models.CharField(max_length=200)
    description = models.CharField()

class User(models.Model): 
    name = models.CharField(max_length=200) 

class PersonalActivity(models.Model): 
    activity = models.ForeignKey(Activity)
    person = models.ForeignKey(User)
    date = models.DateTimeField('activity date')
    weight = models.FloatField(default=0)
    seat_setting = models.IntegerField(default=1)


