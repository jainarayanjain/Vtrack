from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from visitor.models import AccessCard, Approval, Category, Host, NIDType, Timing, \
    VisitorDetail, Valid, PurposeOfVisit

admin.site.register(AccessCard, GuardedModelAdmin)
admin.site.register(Approval, GuardedModelAdmin)
admin.site.register(Category, GuardedModelAdmin)
admin.site.register(PurposeOfVisit, GuardedModelAdmin)
admin.site.register(Host, GuardedModelAdmin)
admin.site.register(NIDType, GuardedModelAdmin)
admin.site.register(Timing, GuardedModelAdmin)
admin.site.register(Valid, GuardedModelAdmin)
admin.site.register(VisitorDetail, GuardedModelAdmin)
