from django.contrib import admin
from guardian.admin import GuardedModelAdmin
from import_export.admin import ImportExportMixin

from visitor.models import AccessCard, Approval, Category, Host, NIDType, \
    PurposeOfVisit, Timing, VisitorDetail, Valid
from visitor.utilites import CategoryEnum

admin.site.register(Approval, GuardedModelAdmin)
admin.site.register(Category, GuardedModelAdmin)
admin.site.register(PurposeOfVisit, GuardedModelAdmin)
admin.site.register(Host, GuardedModelAdmin)
admin.site.register(NIDType, GuardedModelAdmin)
admin.site.register(Timing, GuardedModelAdmin)
admin.site.register(Valid, GuardedModelAdmin)
admin.site.register(VisitorDetail, GuardedModelAdmin)


class AccessCardModelAdmin(ImportExportMixin, admin.ModelAdmin):
    """
    Subclass of ModelAdmin with import/export functionality.
    """

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super(AccessCardModelAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['category'].queryset = Category.objects.filter(
            id__in=
            [CategoryEnum.EMPLOYEE.value,
             CategoryEnum.INTERVIEW.value,
             CategoryEnum.VENDOR.value,
             CategoryEnum.GUEST.value])
        return form


admin.site.register(AccessCard, AccessCardModelAdmin)
