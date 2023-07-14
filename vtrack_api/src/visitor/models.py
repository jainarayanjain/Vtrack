from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy

from user.models import Address
from visitor.choices import Kind
from visitor.managers import CategoryManager, NationalIdentityManager, PurposeManager


class Dropdown(models.Model):
    """Dropdown Model"""

    kind = models.SmallIntegerField(
        gettext_lazy("kind"), choices=Kind.choices, db_index=True
    )
    value = models.CharField(gettext_lazy("value"), max_length=255)
    description = models.TextField(gettext_lazy("description"))
    is_active = models.BooleanField(gettext_lazy("active"), default=True)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["kind", "value"], name="unique_together_type_name"
            ),
        ]
        verbose_name = gettext_lazy("category")
        verbose_name_plural = gettext_lazy("categories")

    def __str__(self):
        return self.value


class Category(Dropdown):
    """Category Proxy Model"""

    objects = CategoryManager()

    def save(self, *args, **kwargs):
        self.kind = Kind.CATEGORY
        super().save(*args, **kwargs)

    class Meta:
        proxy = True


class NationalIdentity(Dropdown):
    """National Identity Proxy Model"""

    objects = NationalIdentityManager()

    def save(self, *args, **kwargs):
        self.kind = Kind.NID
        super().save(*args, **kwargs)

    class Meta:
        proxy = True


class Purpose(Dropdown):
    """Purpose Proxy Model"""

    objects = PurposeManager()

    def save(self, *args, **kwargs):
        self.kind = Kind.PURPOSE
        super().save(*args, **kwargs)

    class Meta:
        proxy = True


class Visitor(models.Model):
    """Visitor Model"""

    first_name = models.CharField(gettext_lazy("first name"), max_length=50)
    last_name = models.CharField(gettext_lazy("last name"), max_length=50)
    email = models.EmailField(gettext_lazy("email"))
    phone = models.BigIntegerField(gettext_lazy("phone number"))
    employee_id = models.BigIntegerField(gettext_lazy("employee id"))
    company = models.CharField(gettext_lazy("company"), max_length=50)
    nid_type = models.ForeignKey(
        NationalIdentity,
        on_delete=models.CASCADE,
        related_name="nid_type",
        verbose_name=gettext_lazy("national identity type"),
    )
    nid = models.CharField(gettext_lazy("national identity"), max_length=50)  # Masking
    signature = models.ImageField(gettext_lazy("signature"))
    photo = models.ImageField(gettext_lazy("photo"))
    is_approved = models.BooleanField(gettext_lazy("approved"), default=False)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("visitor")
        verbose_name_plural = gettext_lazy("visitors")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Visit(models.Model):
    """Visit Model"""

    visitor = models.ForeignKey(
        Visitor,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("visitor"),
    )
    purpose = models.ForeignKey(
        Purpose,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("purpose"),
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("category"),
    )
    contact_person = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="contact_person",
        verbose_name=gettext_lazy("contact person"),
    )
    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE,
        verbose_name=gettext_lazy("address"),
    )
    status = models.BooleanField(gettext_lazy("status"))

    class Meta:
        verbose_name = gettext_lazy("visit")
        verbose_name_plural = gettext_lazy("visits")


class Timing(models.Model):
    """Timing Model"""

    visit = models.ForeignKey(
        Visit,
        on_delete=models.CASCADE,
        related_name="visitor",
        verbose_name=gettext_lazy("visit"),
    )
    guard = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="guard",
        verbose_name=gettext_lazy("guard"),
    )
    action = models.TextField(gettext_lazy("action"))
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("timing")
        verbose_name_plural = gettext_lazy("timings")

    def __str__(self):
        return str(self.visit)
