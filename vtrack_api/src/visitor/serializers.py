from django.utils import timezone
from django.utils.translation import gettext_lazy
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from config.models import Item
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

    def create(self, validated_data):
        """for updating access card is allocated field"""
        instance = AccessCard.objects.get(id=validated_data['access_card'])
        instance.is_allocated = True
        instance.save()
        return super().create(validated_data)


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

    class Meta:
        model = Timing
        fields = "__all__"


class VisitorDetailSerializer(serializers.ModelSerializer):
    """Visitor Serializer"""
    photo = Base64ImageField(label=gettext_lazy("photo"))
    signature = Base64ImageField(label=gettext_lazy("signature"))
    national_id = Base64ImageField(label=gettext_lazy("national_id"))

    class Meta:
        model = VisitorDetail
        fields = "__all__"


class ValidSerializer(serializers.ModelSerializer):
    """Valid Serializer"""

    class Meta:
        model = Valid
        fields = "__all__"

    def update(self, instance, validated_data):
        if validated_data['otp'] == str(
                Item.get_value('visitor:valid:otp:universal_otp')):
            instance.is_valid = True
            validated_data['otp'] = instance.otp
            return super().update(instance, validated_data)
        if not check_otp(validated_data['otp'], instance.otp):
            msg = "Wrong otp"
            raise serializers.ValidationError(msg)
        instance.is_valid = True
        return super().update(instance, validated_data)
