from django.urls import path
from rest_framework import routers

from visitor.apps import VisitorConfig
from visitor.views import (
    AccessCardViewSet,
    ApprovalViewSet,
    CategoryViewSet,
    CheckoutViewSet,
    HostViewSet,
    # HostApprovalViewSet,
    NIDTypeViewSet,
    PurposeOfVisitViewSet,
    TimingViewSet,
    VisitorDetailViewSet,
    ValidViewSet,
)

app_name = VisitorConfig.name

router = routers.DefaultRouter()
router.register(r"access-cards", AccessCardViewSet, basename="accesscard")
router.register(r"approvals", ApprovalViewSet, basename="approval")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"hosts", HostViewSet, basename="host")
router.register(r"nid-types", NIDTypeViewSet, basename="nid-type")
router.register(r"timings", TimingViewSet, basename="timing")
router.register(r"valids", ValidViewSet, basename="timing")
router.register(r"visitor-details", VisitorDetailViewSet, basename="visitor-detail")
router.register(r"purpose-of-visits", PurposeOfVisitViewSet,
                basename="purpose-of-visit")

urlpatterns = [
    path("check-out/", CheckoutViewSet.as_view(), name="check-out"),
    # path("host-approval/<int:pk>/", HostApprovalViewSet.as_view(), name="host-approval")
]
urlpatterns += router.urls
