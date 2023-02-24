from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator
import json 
from django.http import JsonResponse

from .models import User, FoodMenuItem, DiaryItem, WeightGoal
# Create your views here.


def index(request):
    return render(request, "HealthBuddy/index.html")

def menu(request):
    # Attempt to sign user in
    food = FoodMenuItem.objects.all().order_by('id').reverse()
    foodname = ''
    foodtype = 'All'
    foodSearchDic = {'All': False, 'Fruit':False, 'Vegetable': False, 'Meat': False, 'Dairy': False, 'Grain': False, 'Others': False}
    if request.method == "POST":
        foodname = request.POST["food_search_name"]
        foodtype = request.POST["food_search_type"]
        if (foodname.strip() != ""): 
            food = food.filter(foodname__icontains=foodname)
        if (foodtype != 'All'):
            food = food.filter(foodtype=foodtype)
    foodSearchDic[foodtype] = True
    paginator = Paginator(food, 10)
    pageNum = request.GET.get('page')
    foodToRender = paginator.get_page(pageNum)
    return render(request, "HealthBuddy/menu.html", {
        "foodList": foodToRender,
        "food_search_name": foodname,
        "food_search_dic": foodSearchDic
    })

def create_menu_item(request):
    currUser = User.objects.get(pk=request.user.id)
    foodname = request.POST['food_create_name']
    if foodname == '':
        return HttpResponseRedirect(reverse("menu"))
    if request.POST['food_create_calorie'] == '':
        return HttpResponseRedirect(reverse("menu"))
    foodCal =  int(request.POST['food_create_calorie'])
    foodtype = request.POST['food_create_type']
    newMenuItem = FoodMenuItem(
        creator=currUser,
        foodname = foodname,
        foodtype = foodtype,
        foodCal = foodCal
    )
    newMenuItem.save()
    return HttpResponseRedirect(reverse("menu"))

def remove_menu_item(request, item_id):
    item = FoodMenuItem.objects.get(pk=item_id)
    item.delete()
    return JsonResponse({"message": "like removed"})

def diary(request):
    if request.user.is_authenticated:
        currUser = User.objects.get(pk=request.user.id)
        userDiaries = list(DiaryItem.objects.filter(writer = currUser).values())
    else:
        userDiaries = []
    return render(request, "HealthBuddy/diary.html", {
        'userDiaries': userDiaries
    })

def create_diary_item(request):
    if request.user.is_authenticated:
        currUser = User.objects.get(pk=request.user.id)
        data = json.loads(request.body)
        newDiaryItem = DiaryItem(
            writer = currUser,
            year = data["year"],
            month = data["month"],
            date = data["date"],
            weight = data["weight"],
            fruits = data["fruits"],
            vegs = data["vegs"],
            meat = data["meat"],
            dairy = data["dairy"],
            grain = data["grain"],
            others = data["others"],
            notes = data["notes"]
        )
        item = DiaryItem.objects.filter(writer = currUser, year = data["year"], month = data["month"], date = data["date"])
        if len(item) == 1:
            item.delete()
        newDiaryItem.save()
        return JsonResponse({"message": "saved"})
    else:
        return render(request, "HealthBuddy/index.html")
        #return HttpResponseRedirect(reverse("index"))

def create_weight_goal(request):
    if request.user is None:
        return HttpResponseRedirect(reverse("login"))
    currUser = User.objects.get(pk=request.user.id)
    data = json.loads(request.body)
    prev_weight = WeightGoal.objects.filter(user = currUser)
    if len(prev_weight) == 1:
        prev_weight.delete()    
    newWeightGoal = WeightGoal(
        user = currUser,
        weight = data["weight"],
    )
    newWeightGoal.save()
    return JsonResponse({"message": "saved"})

def report(request):
    if request.user.is_authenticated:
        currUser = User.objects.get(pk=request.user.id)
        userDiaries = list(DiaryItem.objects.filter(writer = currUser).values())
        if len(WeightGoal.objects.filter(user = currUser)) == 1:
            weightGoal = WeightGoal.objects.get(user=currUser).weight
        else:
            weightGoal = 0
        return render(request, "HealthBuddy/report.html", {
            "username": currUser.username,
            'userReport': userDiaries,
            'weightGoal': weightGoal
        })
    else:
        return render(request, "HealthBuddy/report.html", {
            "username": '',
            'userReport': [],
            'weightGoal': 0
        })

def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request,  "HealthBuddy/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "HealthBuddy/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "HealthBuddy/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "HealthBuddy/register.html")
