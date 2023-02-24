from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register_view, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("report", views.report, name="report"),
    path("menu", views.menu, name="menu"),
    path("create_menu_item", views.create_menu_item, name="create_menu_item"),
    path("remove_menu_item/<int:item_id>", views.remove_menu_item, name="remove_menu_item"),
    path("diary", views.diary, name="diary"),
    path("create_diary_item", views.create_diary_item, name="create_diary_item"),
    path("create_weight_goal", views.create_weight_goal, name="create_weight_goal"),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)