from django_filters import rest_framework as filters

from organization.models import Address, Country, Organization


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


class OrganizationFilterSet(filters.FilterSet):
    """Address Filter Set"""

    class Meta:
        model = Organization
        fields = "__all__"
