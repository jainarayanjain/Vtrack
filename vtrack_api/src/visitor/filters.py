from django_filters import rest_framework as filters

from visitor.models import NationalIdentity, Purpose, Timing, Visitor, VisitorType


class NationalIdentityFilterSet(filters.FilterSet):
    """National Identity Filter Set"""

    class Meta:
        model = NationalIdentity
        fields = "__all__"


class VisitorTypeFilterSet(filters.FilterSet):
    """Visitor Type Filter Set"""

    class Meta:
        model = VisitorType
        fields = "__all__"


class PurposeFilterSet(filters.FilterSet):
    """Purpose Filter Set"""

    class Meta:
        model = Purpose
        fields = "__all__"


class VisitorFilterSet(filters.FilterSet):
    """Visitor Filter Set"""

    class Meta:
        model = Visitor
        fields = "__all__"


class TimingFilterSet(filters.FilterSet):
    """Timing Filter Set"""

    class Meta:
        model = Timing
        fields = "__all__"
