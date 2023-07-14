from django_filters import rest_framework as filters

from visitor.models import Category, Dropdown, NationalIdentity, Purpose, Timing, Visit, Visitor


class CategoryFilterSet(filters.FilterSet):
    """Category Filter Set"""

    class Meta:
        model = Category
        fields = "__all__"


class DropdownFilterSet(filters.FilterSet):
    """Dropdown Filter Set"""

    class Meta:
        model = Dropdown
        fields = "__all__"


class NationalIdentityFilterSet(filters.FilterSet):
    """National Identity Filter Set"""

    class Meta:
        model = NationalIdentity
        fields = "__all__"


class VisitFilterSet(filters.FilterSet):
    """Visit Filter Set"""

    class Meta:
        model = Visit
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
        exclude = ["signature", "photo"]


class TimingFilterSet(filters.FilterSet):
    """Timing Filter Set"""

    class Meta:
        model = Timing
        fields = "__all__"
