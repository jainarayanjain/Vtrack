from rest_framework import viewsets

from organization.models import Address, Country, Organization
from organization.serializers import (
    AddressSerializer,
    CountrySerializer,
    OrganizationSerializer,
)
from organization.filters import (
    AddressFilterSet,
    CountryFilterSet,
    OrganizationFilterSet,
)


class AddressViewSet(viewsets.ModelViewSet):
    """Address View Set"""

    queryset = Address.objects.filter(is_active=True)
    serializer_class = AddressSerializer
    filterset_class = AddressFilterSet


class CountryViewSet(viewsets.ModelViewSet):
    """Country View Set"""

    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    filterset_class = CountryFilterSet


class OrganizationViewSet(viewsets.ModelViewSet):
    """Organization View Set"""

    queryset = Organization.objects.filter(is_active=True)
    serializer_class = OrganizationSerializer
    filterset_class = OrganizationFilterSet
