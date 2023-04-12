from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy

from visitor.choices import Type
from visitor.managers import NationalIdentityManager, VisitorTypeManager


class Category(models.Model):
    """Category Model"""

    type = models.SmallIntegerField(
        choices=Type.choices, db_index=True, verbose_name=gettext_lazy("type")
    )
    name = models.CharField(gettext_lazy("name"), max_length=50)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["type", "name"], name="unique_together_type_name"
            ),
        ]
        verbose_name = gettext_lazy("category")
        verbose_name_plural = gettext_lazy("categories")

    def __str__(self):
        return self.name


class NationalIdentity(Category):
    """National Identity Proxy Model"""

    objects = NationalIdentityManager()

    def save(self, *args, **kwargs):
        self.type = Type.NID
        super().save(*args, **kwargs)

    class Meta:
        proxy = True


class VisitorType(Category):
    """Visitor Type Proxy Model"""

    objects = VisitorTypeManager()

    def save(self, *args, **kwargs):
        self.type = Type.VISITOR_TYPE
        super().save(*args, **kwargs)

    class Meta:
        proxy = True


class Purpose(models.Model):
    """Purpose Model"""

    category = models.ForeignKey(
        VisitorType,
        on_delete=models.CASCADE,
        related_name="purpose",
        verbose_name=gettext_lazy("category"),
    )
    description = models.TextField(gettext_lazy("description"))
    is_active = models.BooleanField(gettext_lazy("active"), default=True)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("purpose")
        verbose_name_plural = gettext_lazy("purposes")

    def __str__(self):
        return self.description


class Visitor(models.Model):
    """Visitor Model"""

    first_name = models.CharField(gettext_lazy("first name"), max_length=50)
    last_name = models.CharField(gettext_lazy("last name"), max_length=50)
    email = models.EmailField(gettext_lazy("email"))
    phone = models.BigIntegerField(gettext_lazy("phone number"))
    company = models.CharField(gettext_lazy("company"), max_length=50)
    visitor_type = models.ForeignKey(
        VisitorType,
        on_delete=models.CASCADE,
        related_name="visitor_type",
        verbose_name=gettext_lazy("visitor type"),
    )
    purpose = models.ForeignKey(
        Purpose,
        on_delete=models.CASCADE,
        related_name="purpose",
        verbose_name=gettext_lazy("purpose"),
    )
    nid_type = models.ForeignKey(
        NationalIdentity,
        on_delete=models.CASCADE, related_name="nid_type",
        verbose_name=gettext_lazy("national identity type"),
    )
    nid = models.CharField(gettext_lazy("national identity"), max_length=50)  # Masking
    signature = models.ImageField(gettext_lazy("signature"))
    photo = models.ImageField(gettext_lazy("photo"))
    contact_person = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="contact_person",
        verbose_name=gettext_lazy("contact person"),
    )
    is_approved = models.BooleanField(gettext_lazy("approved"), default=False)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("visitor")
        verbose_name_plural = gettext_lazy("visitors")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Timing(models.Model):
    """Timing Model"""

    visitor = models.ForeignKey(
        Visitor,
        on_delete=models.CASCADE,
        related_name="visitor",
        verbose_name=gettext_lazy("visitor id"),
    )
    check_in = models.DateTimeField(gettext_lazy("check in time"), auto_now_add=True)
    check_out = models.DateTimeField(
        gettext_lazy("check out time"), blank=True, null=True
    )
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("timing")
        verbose_name_plural = gettext_lazy("timings")

    def __str__(self):
        return str(self.visitor)
