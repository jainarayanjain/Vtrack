from django.db import models

from visitor.choices import Kind


class NationalIdentityManager(models.Manager):
    """National Identity Manager"""

    def get_queryset(self):
        return super().get_queryset().filter(kind=Kind.NID)


class CategoryManager(models.Manager):
    """Category Manager"""

    def get_queryset(self):
        return super().get_queryset().filter(kind=Kind.CATEGORY)


class PurposeManager(models.Manager):
    """Purpose Manager"""

    def get_queryset(self):
        return super().get_queryset().filter(kind=Kind.PURPOSE)
