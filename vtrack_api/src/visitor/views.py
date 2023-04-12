from rest_framework import viewsets

from visitor.filters import (
    NationalIdentityFilterSet,
    PurposeFilterSet,
    TimingFilterSet,
    VisitorFilterSet,
    VisitorTypeFilterSet,
)
from visitor.models import NationalIdentity, Purpose, Timing, Visitor, VisitorType
from visitor.serializers import (
    NationalIdentitySerializer,
    PurposeSerializer,
    TimingSerializer,
    VisitorSerializer,
    VisitorTypeSerializer,
)


class NationalIdentityViewSet(viewsets.ModelViewSet):
    """ "National Identity View Set"""

    queryset = NationalIdentity.objects.all()
    serializer_class = NationalIdentitySerializer
    filterset_class = NationalIdentityFilterSet


class PurposeViewSet(viewsets.ModelViewSet):
    """ "Purpose View Set"""

    queryset = Purpose.objects.all()
    serializer_class = PurposeSerializer
    filterset_class = PurposeFilterSet


class TimingViewSet(viewsets.ModelViewSet):
    """ "Timing View Set"""

    queryset = Timing.objects.all()
    serializer_class = TimingSerializer
    filterset_class = TimingFilterSet


class VisitorViewSet(viewsets.ModelViewSet):
    """ "Visitor View Set"""

    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer
    filterset_class = VisitorFilterSet


class VisitorTypeViewSet(viewsets.ModelViewSet):
    """ "Visitor Type View Set"""

    queryset = VisitorType.objects.all()
    serializer_class = VisitorTypeSerializer
    filterset_class = VisitorTypeFilterSet
