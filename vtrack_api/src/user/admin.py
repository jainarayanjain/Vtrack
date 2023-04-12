from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from user.models import Department, Profile

admin.site.register(Department, GuardedModelAdmin)
admin.site.register(Profile, GuardedModelAdmin)
