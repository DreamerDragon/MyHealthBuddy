from django.contrib import admin
from .models import User, FoodMenuItem, DiaryItem, WeightGoal

# Register your models here.
admin.site.register(User)
admin.site.register(FoodMenuItem)
admin.site.register(DiaryItem)
admin.site.register(WeightGoal)