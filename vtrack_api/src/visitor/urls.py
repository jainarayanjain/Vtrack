from visitor.apps import VisitorConfig
from rest_framework import routers
from visitor.views import (
    NationalIdentityViewSet,
    PurposeViewSet,
    TimingViewSet,
    VisitorTypeViewSet,
    VisitorViewSet,
)

router = routers.DefaultRouter()
app_name = VisitorConfig.name
router.register(r"timings", TimingViewSet, basename="timing")
router.register(
    r"national-identities", NationalIdentityViewSet, basename="national-identity"
)
router.register(r"purposes", PurposeViewSet, basename="purpose")
router.register(r"visitor-types", VisitorTypeViewSet, basename="visitor-type")
router.register(r"visitors", VisitorViewSet, basename="visitor")


urlpatterns = []

urlpatterns += routers
