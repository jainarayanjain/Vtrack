from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy
from user.models import Address


class NIDType(models.Model):
    """NID Type Model"""
    name = models.CharField(gettext_lazy("name"), max_length=50)
    is_active = models.BooleanField(gettext_lazy("is_active"), default=True)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("nid-type")
        verbose_name_plural = gettext_lazy("nid-types")

    def __str__(self):
        return self.name


class Host(models.Model):
    """Host Model"""
    name = models.CharField(gettext_lazy("name"), max_length=50)
    email = models.EmailField(gettext_lazy("email"))
    phone = models.BigIntegerField(gettext_lazy("phone number"))
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("host")
        verbose_name_plural = gettext_lazy("hosts")

    def __str__(self):
        return self.name


class Category(models.Model):
    """Category Model"""
    name = models.CharField(gettext_lazy("name"), max_length=50)
    visit_purpose = models.CharField(gettext_lazy("visit purpose"), max_length=100)

    class Meta:
        verbose_name = gettext_lazy("category")
        verbose_name_plural = gettext_lazy("categories")

    def __str__(self):
        return str(self.name + ' - ' + self.visit_purpose)


class VisitorDetail(models.Model):
    """Visitor Model"""

    name = models.CharField(gettext_lazy("name"), max_length=50, blank=True, null=True)
    email = models.EmailField(gettext_lazy("email"), unique=True)
    phone = models.BigIntegerField(gettext_lazy("phone number"), blank=True, null=True,
                                   unique=True)
    photo = models.ImageField(gettext_lazy("photo"), blank=True, null=True,
                              upload_to='visitor_photos')
    signature = models.ImageField(gettext_lazy("signature"), blank=True, null=True,
                                  upload_to='signatures')
    company = models.CharField(gettext_lazy("company"), max_length=50, blank=True,
                               null=True)
    nid_type = models.ForeignKey(
        NIDType,
        on_delete=models.CASCADE,
        related_name="nid_type",
        verbose_name=gettext_lazy("national identity type"),
        blank=True, null=True)
    national_id = models.ImageField(gettext_lazy("national id"), blank=True, null=True,
                                    upload_to='national_ids')
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("visitor-detail")
        verbose_name_plural = gettext_lazy("visitor-details")

    def __str__(self):
        return str(self.id) + '- ' + str(self.name)


class Valid(models.Model):
    """Valid Model"""
    otp = models.CharField(gettext_lazy("otp"), max_length=50, blank=True, null=True)
    is_valid = models.BooleanField(gettext_lazy("is_valid"), default=False, blank=True,
                                   null=True)
    visitor = models.OneToOneField(
        VisitorDetail,
        on_delete=models.DO_NOTHING,
        verbose_name=gettext_lazy("visitor_id"),
        related_name="valid")
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("valid")
        verbose_name_plural = gettext_lazy("valids")

    def __str__(self):
        return self.otp + ' - ' + str(self.visitor)


class AccessCard(models.Model):
    """Access Card Model"""
    card_number = models.CharField(gettext_lazy("card number"), max_length=50)
    is_allocated = models.BooleanField(gettext_lazy("is allocated"), default=False)
    address = models.ForeignKey(Address, on_delete=models.CASCADE,
                                verbose_name=gettext_lazy("address id"))

    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("accesscard")
        verbose_name_plural = gettext_lazy("accesscards")

    def __str__(self):
        return self.card_number + '-' + self.address


class Approval(models.Model):
    """Approval Model"""
    visitor = models.ForeignKey(VisitorDetail, on_delete=models.CASCADE,
                                verbose_name=gettext_lazy("visitor id"),
                                related_name="approval"
                                )
    host = models.ForeignKey(Host, on_delete=models.CASCADE,
                             verbose_name=gettext_lazy("host id"),
                             related_name="approval_host",
                             blank=True,
                             null=True)
    access_card = models.ForeignKey(AccessCard, on_delete=models.CASCADE,
                                    verbose_name=gettext_lazy("access card id"),
                                    related_name="approval_access_card",
                                    blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 verbose_name=gettext_lazy("category id"),
                                 blank=True, null=True)
    is_approved = models.BooleanField(gettext_lazy("is approved"), default=False)
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("approval")
        verbose_name_plural = gettext_lazy("approvals")

    def __str__(self):
        return 'Approval' + '-' + str(self.id)


class Timing(models.Model):
    """Timing Model"""
    check_in = models.DateTimeField(gettext_lazy("check in"))
    check_out = models.DateTimeField(gettext_lazy("check out"), blank=True, null=True)
    approval = models.OneToOneField(Approval, on_delete=models.CASCADE,
                                    verbose_name=gettext_lazy("approval id"),
                                    related_name="timing")
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("timing")
        verbose_name_plural = gettext_lazy("timings")

    def __str__(self):
        return str(self.approval.id)
