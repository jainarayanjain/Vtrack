from django.contrib import admin
from guardian.admin import GuardedModelAdmin
from organization.models import Address, Country, Organization

admin.site.register(Address, GuardedModelAdmin)
admin.site.register(Country, GuardedModelAdmin)
admin.site.register(Organization, GuardedModelAdmin)

