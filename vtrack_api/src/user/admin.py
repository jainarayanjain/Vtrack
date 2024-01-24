from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from user.models import Address, Country, Organization, Profile

admin.site.register(Address, GuardedModelAdmin)
admin.site.register(Country, GuardedModelAdmin)
admin.site.register(Organization, GuardedModelAdmin)
admin.site.register(Profile, GuardedModelAdmin)
