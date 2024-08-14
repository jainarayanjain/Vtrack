from django.utils import timezone
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, viewsets
from rest_framework.renderers import TemplateHTMLRenderer
from visitor.filters import (
    AccessCardFilterSet,
    ApprovalFilterSet,
    CategoryFilterSet, HostFilterSet, NIDTypeFilterSet, TimingFilterSet
)
from visitor.models import AccessCard, Approval, Category, Host, NIDType, \
    PurposeOfVisit, Timing, VisitorDetail, Valid
from visitor.serializers import (
    AccessCardSerializer,
    ApprovalSerializer,
    CategorySerializer,
    HostSerializer,
    NIDTypeSerializer,
    TimingSerializer,
    VisitorDetailSerializer,
    ValidSerializer,
    PurposeOfVisitSerializer
)


class AccessCardViewSet(viewsets.ModelViewSet):
    """AccessCard View Set"""

    queryset = AccessCard.objects.all()
    serializer_class = AccessCardSerializer
    filterset_class = AccessCardFilterSet

    def get_queryset(self):
        category = int(self.request.query_params['category_number'])
        if category in [int(AccessCard.Choices.Guest.value),
                        int(AccessCard.Choices.Visitor.value),
                        int(AccessCard.Choices.Client.value),
                        int(AccessCard.Choices.NewHires.value)]:
            category = AccessCard.Choices.Guest.value
        filter_kwargs = {
            "is_allocated": False,
            "category_id": category
        }
        queryset = super().get_queryset().filter(**filter_kwargs)
        return queryset


class PurposeOfVisitViewSet(viewsets.ModelViewSet):
    """ PurposeOfVisit View Set"""

    queryset = PurposeOfVisit.objects.all()
    serializer_class = PurposeOfVisitSerializer

    def get_queryset(self):
        filter_kwargs = {
            "category_id": self.request.query_params['category']
        }
        queryset = super().get_queryset().filter(**filter_kwargs)
        return queryset


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


class VisitorDetailViewSet(viewsets.ModelViewSet):
    """ Visitor View Set"""

    queryset = VisitorDetail.objects.all()
    serializer_class = VisitorDetailSerializer


class ValidViewSet(viewsets.ModelViewSet):
    """ Valid View Set"""

    queryset = Valid.objects.all()
    serializer_class = ValidSerializer


class CheckoutViewSet(generics.ListAPIView):
    """Check out View Set"""

    queryset = Timing.objects.all()
    serializer_class = TimingSerializer

    def get(self, request, *args, **kwargs):
        instance = Timing.objects.filter(approval__visitor__email=self.request.query_params['email']).last()
        if instance.approval.access_card is not None:
            access_card_instance = instance.approval.access_card
            access_card_instance.is_allocated = False
            access_card_instance.save()  # for making the access card available again
        Valid.objects.get(visitor__email=self.request.query_params['email']).delete()
        instance.check_out = timezone.now()
        instance.save()
        return self.list(request, *args, **kwargs)
