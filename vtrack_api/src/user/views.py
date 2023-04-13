from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.models import Token

from user.filters import DepartmentFilterSet, ProfileFilterSet
from user.models import Department, Profile
from user.serializers import (
    DepartmentSerializer,
    ProfileSerializer,
    TokenSerializer,
    UserSerializer,
)


class LoginView(generics.CreateAPIView):
    """Login View: Use to log in user"""

    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    permission_classes = [permissions.AllowAny]


class DetailView(generics.RetrieveAPIView):
    """Detail View: Use to return user details"""

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LogoutView(generics.DestroyAPIView):
    """Logout View: Use to log out the user"""

    queryset = Token.objects.all()

    def get_object(self):
        return self.get_queryset().get(user=self.request.user)


class DepartmentViewSet(viewsets.ModelViewSet):
    """Department View Set"""

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filterset_class = DepartmentFilterSet


class ProfileViewSet(viewsets.ModelViewSet):
    """Profile View Set"""

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filterset_class = ProfileFilterSet
