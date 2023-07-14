from django_filters import rest_framework as filters

from user.models import Address, Country, Department, Organization, Profile


class AddressFilterSet(filters.FilterSet):
    """Address Filter Set"""

    class Meta:
        model = Address
        fields = "__all__"


class CountryFilterSet(filters.FilterSet):
    """Country Filter Set"""

    class Meta:
        model = Country
        fields = "__all__"


class DepartmentFilterSet(filters.FilterSet):
    """Department Filter Set"""

    class Meta:
        model = Department
        fields = "__all__"


class OrganizationFilterSet(filters.FilterSet):
    """Address Filter Set"""

    class Meta:
        model = Organization
        fields = "__all__"


class ProfileFilterSet(filters.FilterSet):
    """Profile Filter Set"""

    class Meta:
        model = Profile
        fields = "__all__"
