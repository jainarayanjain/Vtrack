from rest_framework import serializers

from user.serializers import AddressSerializer, UserSerializer
from visitor.models import (
    AccessCard, Approval, Category, Host, NIDType, Timing,
    Visitor, Valid
)


class AccessCardSerializer(serializers.ModelSerializer):
    """AccessCard Serializer"""

    class Meta:
        model = AccessCard
        fields = "__all__"


class ApprovalSerializer(serializers.ModelSerializer):
    """Approval Serializer"""

    class Meta:
        model = Approval
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    """Category Serializer"""

    class Meta:
        model = Category
        fields = "__all__"


class HostSerializer(serializers.ModelSerializer):
    """Host Serializer"""

    class Meta:
        model = Host
        fields = "__all__"


class NIDTypeSerializer(serializers.ModelSerializer):
    """NIDType Serializer"""

    class Meta:
        model = NIDType
        fields = "__all__"


class TimingSerializer(serializers.ModelSerializer):
    """Timing Serializer"""

    class Meta:
        model = Timing
        fields = "__all__"


class VisitorSerializer(serializers.ModelSerializer):
    """Visitor Serializer"""

    class Meta:
        model = Visitor
        fields = "__all__"


class ValidSerializer(serializers.ModelSerializer):
    """Valid Serializer"""

    class Meta:
        model = Valid
        fields = "__all__"
