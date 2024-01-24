from rest_framework import routers

from visitor.apps import VisitorConfig
from visitor.views import (
    AccessCardViewSet,
    ApprovalViewSet,
    CategoryViewSet,
    HostViewSet,
    NIDTypeViewSet,
    TimingViewSet,
    VisitorViewSet,
    ValidViewSet,
)

app_name = VisitorConfig.name

router = routers.DefaultRouter()
router.register(r"access-cards", AccessCardViewSet, basename="accesscard")
router.register(r"approvals", ApprovalViewSet, basename="approval")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"hosts", HostViewSet, basename="host")
router.register(r"nidtypes", NIDTypeViewSet, basename="nidtype")
router.register(r"timings", TimingViewSet, basename="timing")
router.register(r"valids", ValidViewSet, basename="timing")
router.register(r"visit", VisitorViewSet, basename="visitor")


urlpatterns = []
urlpatterns += router.urls
