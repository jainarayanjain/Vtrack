from django_filters import rest_framework as filters

from user.models import Department, Profile


class DepartmentFilterSet(filters.FilterSet):
    """Department Filter Set"""

    class Meta:
        model = Department
        fields = "__all__"


class ProfileFilterSet(filters.FilterSet):
    """Profile Filter Set"""

    class Meta:
        model = Profile
        fields = "__all__"
