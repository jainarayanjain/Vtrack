from django.db import models
from django.utils.translation import gettext_lazy


class Country(models.Model):
    """Country Model"""

    name = models.CharField(gettext_lazy("name"), max_length=50)
    code = models.CharField(gettext_lazy("code"), max_length=10)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("country")
        verbose_name_plural = gettext_lazy("countries")


class Organization(models.Model):
    """Organization Model"""

    name = models.CharField(gettext_lazy("name"), max_length=100)
    is_active = models.BooleanField(gettext_lazy("is_active"))
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("organization")
        verbose_name_plural = gettext_lazy("organizations")


class Address(models.Model):
    """Address Model"""

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("organization"),
    )
    street = models.CharField(gettext_lazy("street"), max_length=256)
    city = models.CharField(gettext_lazy("city"), max_length=50)
    region = models.CharField(gettext_lazy("region"), max_length=50)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, verbose_name=gettext_lazy("country")
    )
    postcode = models.BigIntegerField(gettext_lazy("postcode"))
    code = models.CharField(gettext_lazy("code"), max_length=20)
    is_active = models.BooleanField(gettext_lazy("is_active"))

    class Meta:
        verbose_name = gettext_lazy("address")
        verbose_name_plural = gettext_lazy("addresses")
