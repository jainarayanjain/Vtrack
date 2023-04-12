from rest_framework import serializers

from organization.models import Address, Country, Organization


class CountrySerializer(serializers.ModelSerializer):
    """Country Serializer"""

    class Meta:
        model = Country
        fields = '__all__'


class OrganizationSerializer(serializers.ModelSerializer):
    """Organization Serializer"""

    class Meta:
        model = Organization
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    """Address Serializer"""

    organization = OrganizationSerializer(read_only=True)
    country = CountrySerializer(read_only=True)

    class Meta:
        model = Address
        fields = '__all__'
