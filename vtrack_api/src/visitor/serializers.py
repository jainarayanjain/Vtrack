from rest_framework import serializers

from user.serializers import AddressSerializer, UserSerializer
from visitor.models import (
    Category,
    Dropdown,
    NationalIdentity,
    Purpose,
    Timing,
    Visitor
)


class CategorySerializer(serializers.ModelSerializer):
    """Category Serializer"""

    class Meta:
        model = Category


class DropdownSerializer(serializers.ModelSerializer):
    """Dropdown Serializer"""

    class Meta:
        model = Dropdown


class NationalIdentitySerializer(CategorySerializer):
    """National Identity Serializer"""

    class Meta(CategorySerializer.Meta):
        model = NationalIdentity


class PurposeSerializer(serializers.ModelSerializer):
    """Purpose Serializer"""

    category = CategorySerializer(read_only=True)

    class Meta:
        model = Purpose
        fields = "__all__"


class VisitorSerializer(serializers.ModelSerializer):
    """Visitor Serializer"""

    nid_type = NationalIdentitySerializer(read_only=True)

    class Meta:
        model = Visitor
        fields = "__all__"


class VisitSerializer(serializers.ModelSerializer):
    """Visit Serializer"""

    visitor = VisitorSerializer(read_only=True)
    purpose = PurposeSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    contact_person = UserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)


class TimingSerializer(serializers.ModelSerializer):
    """Timing Serializer"""

    visitor = VisitorSerializer(read_only=True)

    class Meta:
        model = Timing
        fields = "__all__"
