from django_filters import rest_framework as filters

from visitor.models import AccessCard, Approval, Category, Host, NIDType, Timing, \
    Visitor, Valid


class AccessCardFilterSet(filters.FilterSet):
    """Access Card Filter Set"""

    class Meta:
        model = AccessCard
        fields = "__all__"


class ApprovalFilterSet(filters.FilterSet):
    """Approval Filter Set"""

    class Meta:
        model = Approval
        fields = "__all__"


class CategoryFilterSet(filters.FilterSet):
    """ Category Filter Set"""

    class Meta:
        model = Category
        fields = "__all__"


class HostFilterSet(filters.FilterSet):
    """Host Filter Set"""

    class Meta:
        model = Host
        fields = "__all__"


class NIDTypeFilterSet(filters.FilterSet):
    """NID Type Filter Set"""

    class Meta:
        model = NIDType
        fields = "__all__"


class TimingFilterSet(filters.FilterSet):
    """Timing Filter Set"""

    class Meta:
        model = Timing
        fields = "__all__"



class ValidFilterSet(filters.FilterSet):
    """Valid Filter Set"""

    class Meta:
        model = Valid
        fields = "__all__"
