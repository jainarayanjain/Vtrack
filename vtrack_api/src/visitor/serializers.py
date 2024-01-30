from django.utils import timezone
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


class VisitorDetailSerializer(serializers.ModelSerializer):
    """Visitor Serializer"""

    class Meta:
        model = VisitorDetail
        fields = "__all__"

    def update(self, instance, validated_data):
        instance = VisitorDetail.objects.filter(phone=validated_data['phone'])
        approval_instance = Approval.objects.filter(instance.pk)
        # fetch id of timing table from approval_instance
        instance.check_out = timezone.now()


class ValidSerializer(serializers.ModelSerializer):
    """Valid Serializer"""

    class Meta:
        model = Valid
        fields = "__all__"

    def update(self, instance, validated_data):
        if check_otp(validated_data['otp']):
            instance.is_valid = True
