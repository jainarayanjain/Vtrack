from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import AnonymousUser
from django.db.models import Q
from guardian.admin import GuardedModelAdmin

from user.models import Address, Country, Organization

User = get_user_model()

admin.site.unregister(User)

admin.site.register(Country, GuardedModelAdmin)
admin.site.register(Organization, GuardedModelAdmin)


class AddressStackedInline(admin.StackedInline):
    """Address Stacked Inline"""

    model = Address


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """User Admin"""

    inlines = [AddressStackedInline]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.filter(~Q(username=AnonymousUser.__name__))
