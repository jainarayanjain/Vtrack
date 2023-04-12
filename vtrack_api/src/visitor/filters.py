from django_filters import rest_framework as filters

from visitor.models import Category, Purpose, Timing, Visitor


class CategoryFilterSet(filters.FilterSet):
    """Category Filter Set"""

    class Meta:
        model = Category
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
