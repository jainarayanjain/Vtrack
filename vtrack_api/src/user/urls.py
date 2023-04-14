from django.urls import path
from rest_framework import routers

from user.apps import UserConfig
from user.views import (
    DepartmentViewSet,
    DetailView,
    LoginView,
    LogoutView,
    ProfileViewSet,
)

app_name = UserConfig.name

router = routers.DefaultRouter()
router.register(r"departments", DepartmentViewSet, basename="department")
router.register(r"profiles", ProfileViewSet, basename="profile")

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("detail/", DetailView.as_view(), name="detail"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
urlpatterns += router.urls
