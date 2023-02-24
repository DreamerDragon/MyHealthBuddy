from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class FoodMenuItem(models.Model):
    creator = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'creator')
    foodname = models.CharField(max_length = 20)
    foodtype = models.CharField(max_length = 20)
    foodCal = models.FloatField(default = 0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"${self.creator} created ${self.foodname} with type ${self.foodtype} and cal ${self.foodCal}"

class DiaryItem(models.Model):
    writer = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'writer')
    year = models.CharField(max_length = 5)
    month = models.CharField(max_length = 10)
    date = models.CharField(max_length = 5)
    weight = models.FloatField(default = 0)
    fruits = models.FloatField(default = 0)
    vegs = models.FloatField(default = 0)
    meat = models.FloatField(default = 0)
    dairy = models.FloatField(default = 0)
    grain = models.FloatField(default = 0)
    others = models.FloatField(default = 0)
    notes = models.CharField(max_length = 200)

    def __str__(self):
        return f"${self.writer} recorded on ${self.year}-${self.month}-${self.date} with weight ${self.weight}, notes ${self.notes}"

class WeightGoal(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'user')
    weight = models.FloatField(default = 0)
    def __str__(self):
        return f"${self.user} created weight ${self.weight}"


