from django.utils import timezone
from django.utils.translation import gettext_lazy
from rest_framework import serializers

from visitor.helpers import check_otp
from visitor.models import (
    AccessCard, Approval, Category, Host, NIDType, Timing,
    Valid, VisitorDetail,
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

    def update(self, instance, validated_data):
        """Check in logic """
        if validated_data["is_approved"]:
            t = Timing(approval=instance.approval, check_in=timezone.now())
            t.save()
        return super().update(instance, validated_data)


class NIDTypeSerializer(serializers.ModelSerializer):
    """NIDType Serializer"""

    class Meta:
        model = NIDType
        fields = "__all__"


class TimingSerializer(serializers.ModelSerializer):
    """Timing Serializer"""

    phone_number = serializers.IntegerField(label=gettext_lazy("phone_number"),
                                            read_only=True)

    class Meta:
        model = Timing
        fields = "__all__"

    def validate(self, attrs):
        breakpoint()


class VisitorDetailSerializer(serializers.ModelSerializer):
    """Visitor Serializer"""

    class Meta:
        model = VisitorDetail
        fields = "__all__"


class ValidSerializer(serializers.ModelSerializer):
    """Valid Serializer"""

    class Meta:
        model = Valid
        fields = "__all__"

    def update(self, instance, validated_data):
        if not check_otp(validated_data['otp'], instance.otp):
            msg = "Wrong otp"
            raise serializers.ValidationError(msg)
        instance.is_valid = True
        return super().update(instance, validated_data)
