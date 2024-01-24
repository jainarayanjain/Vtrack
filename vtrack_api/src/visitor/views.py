from rest_framework import viewsets

from visitor.filters import (
    AccessCardFilterSet,
    ApprovalFilterSet,
    CategoryFilterSet, HostFilterSet, NIDTypeFilterSet, TimingFilterSet,
     ValidFilterSet
)
from visitor.models import AccessCard, Approval, Category, Host, NIDType, Timing, \
    Visitor, Valid
from visitor.serializers import (
    AccessCardSerializer,
    ApprovalSerializer,
    CategorySerializer,
    HostSerializer,
    NIDTypeSerializer,
    TimingSerializer,
    VisitorSerializer,
    ValidSerializer
)


class AccessCardViewSet(viewsets.ModelViewSet):
    """AccessCard View Set"""

    queryset = AccessCard.objects.all()
    serializer_class = AccessCardSerializer
    filterset_class = AccessCardFilterSet


class ApprovalViewSet(viewsets.ModelViewSet):
    """ Approval View Set"""

    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer
    filterset_class = ApprovalFilterSet


class CategoryViewSet(viewsets.ModelViewSet):
    """ Category View Set"""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_class = CategoryFilterSet


class HostViewSet(viewsets.ModelViewSet):
    """ Host View Set"""

    queryset = Host.objects.all()
    serializer_class = HostSerializer
    filterset_class = HostFilterSet


class NIDTypeViewSet(viewsets.ModelViewSet):
    """ NIDType View Set"""

    queryset = NIDType.objects.all()
    serializer_class = NIDTypeSerializer
    filterset_class = NIDTypeFilterSet


class TimingViewSet(viewsets.ModelViewSet):
    """ Host View Set"""

    queryset = Timing.objects.all()
    serializer_class = TimingSerializer
    filterset_class = TimingFilterSet


class VisitorViewSet(viewsets.ModelViewSet):
    """ Visitor View Set"""

    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer



class ValidViewSet(viewsets.ModelViewSet):
    """ Valid View Set"""

    queryset = Valid.objects.all()
    serializer_class = ValidSerializer

