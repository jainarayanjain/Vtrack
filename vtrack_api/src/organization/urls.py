from rest_framework import routers

from organization.apps import OrganizationConfig
from organization.views import AddressViewSet, CountryViewSet, OrganizationViewSet

app_name = OrganizationConfig.name

router = routers.DefaultRouter()
router.register(r"addresses", AddressViewSet, basename="address")
router.register(r"countries", CountryViewSet, basename="country")
router.register(r"organizations", OrganizationViewSet, basename="organization")

urlpatterns = []
urlpatterns += router.urls
