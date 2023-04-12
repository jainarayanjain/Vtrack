from rest_framework import serializers

from user.serializers import UserSerializer
from visitor.models import (
    Category,
    NationalIdentity,
    Purpose,
    Timing,
    Visitor,
    VisitorType,
)


class CategorySerializer(serializers.ModelSerializer):
    """Category Serializer"""

    class Meta:
        model = Category
        exclude = ["type"]


class NationalIdentitySerializer(CategorySerializer):
    """National Identity Serializer"""

    class Meta(CategorySerializer.Meta):
        model = NationalIdentity


class VisitorTypeSerializer(CategorySerializer):
    """Visitor Type Serializer"""

    class Meta(CategorySerializer.Meta):
        model = VisitorType


class PurposeSerializer(serializers.ModelSerializer):
    """Purpose Serializer"""

    category = CategorySerializer(read_only=True)

    class Meta:
        model = Purpose
        fields = "__all__"


class VisitorSerializer(serializers.ModelSerializer):
    """Visitor Serializer"""

    purpose = PurposeSerializer(read_only=True)
    visitor_type = VisitorTypeSerializer(read_only=True)
    nid_type = NationalIdentitySerializer(read_only=True)
    contact_person = UserSerializer(read_only=True)

    class Meta:
        model = Visitor
        fields = "__all__"


class TimingSerializer(serializers.ModelSerializer):
    """Timing Serializer"""

    visitor = VisitorSerializer(read_only=True)

    class Meta:
        model = Timing
        fields = "__all__"
