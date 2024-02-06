from django.conf import settings
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

    def __str__(self):
        return self.name


class Organization(models.Model):
    """Organization Model"""

    name = models.CharField(gettext_lazy("name"), max_length=100)
    is_active = models.BooleanField(gettext_lazy("active"), default=True)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("organization")
        verbose_name_plural = gettext_lazy("organizations")

    def __str__(self):
        return self.name


class Address(models.Model):
    """Address Model"""

    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                verbose_name=gettext_lazy("user"),
                                related_name='address',
                                on_delete=models.CASCADE)
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
    is_active = models.BooleanField(gettext_lazy("active"), default=True)

    class Meta:
        verbose_name = gettext_lazy("address")
        verbose_name_plural = gettext_lazy("addresses")

    def __str__(self):  # pragma: no cover
        address = (
                ", ".join([self.street, self.city, self.region, str(self.country)])
                + " - "
                + str(self.postcode)
        )
        return address

    @staticmethod
    def clean_location(location):
        return location.strip().lower().title()

    def save(self, *args, **kwargs):
        self.city = self.clean_location(self.city)
        self.region = self.clean_location(self.region)
        super().save(*args, **kwargs)

