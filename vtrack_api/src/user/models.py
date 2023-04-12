from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy

from organization.models import Address


class Department(models.Model):
    """Department Model"""

    name = models.CharField(gettext_lazy("name"), max_length=50)
    is_active = models.BooleanField(gettext_lazy("active"), default=True)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("department")
        verbose_name_plural = gettext_lazy("departments")

    def __str__(self):
        return self.name


class Profile(models.Model):
    """Profile Model"""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("user"),
    )
    phone = models.BigIntegerField(gettext_lazy("phone number"))
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("department"),
    )
    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("address"),
    )
    is_security_guard = models.BooleanField(
        gettext_lazy("security guard"), default=True
    )
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("profile")
        verbose_name_plural = gettext_lazy("profiles")

    def __str__(self):
        return self.user.username
