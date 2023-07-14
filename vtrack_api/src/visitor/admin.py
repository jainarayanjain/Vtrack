from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from visitor.models import Dropdown, Purpose, Timing, Visitor

admin.site.register(Dropdown, GuardedModelAdmin)
admin.site.register(Purpose, GuardedModelAdmin)
admin.site.register(Timing, GuardedModelAdmin)
admin.site.register(Visitor, GuardedModelAdmin)
