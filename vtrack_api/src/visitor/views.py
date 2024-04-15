from django.utils import timezone
from rest_framework import generics, viewsets
from rest_framework.renderers import TemplateHTMLRenderer
from visitor.filters import (
    AccessCardFilterSet,
    ApprovalFilterSet,
    CategoryFilterSet, HostFilterSet, NIDTypeFilterSet, TimingFilterSet
)
from visitor.models import AccessCard, Approval, Category, Host, NIDType, \
    PurposeOfVisit, Timing,VisitorDetail, Valid
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
        filter_kwargs = {
            "is_allocated": False,
            "category_id": self.request.query_params['category']
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
        instance = Timing.objects.get(
            approval__visitor__phone=self.request.query_params['phone'])
        if instance.approval.access_card is not None:
            access_card_instance = AccessCard.objects.get(
                approval_access_card__visitor__phone=self.request.query_params['phone'])
            access_card_instance.is_allocated = False
            access_card_instance.save()  # for making the access card available again
        Valid.objects.get(
            visitor__phone=self.request.query_params['phone']).delete()
        instance.check_out = timezone.now()
        instance.save()
        return self.list(request, *args, **kwargs)


# class HostApprovalViewSet(generics.RetrieveAPIView):
#     """Host Approval View Set"""
#
#     queryset = Approval.objects.all()
#     serializer_class = ApprovalSerializer
#     permission_classes = [permissions.AllowAny]
#     renderer_classes = [TemplateHTMLRenderer]
#     template_name = "success.html"
#
#     def get(self, request, *args, **kwargs):
#         instance = Approval.objects.get(id=kwargs['pk'])
#         instance.is_approved = self.request.query_params['is_approved']
#         instance.save()
#         Timing.objects.create(approval=instance, check_in=timezone.now())
#         return super().get(request, *args, **kwargs)
