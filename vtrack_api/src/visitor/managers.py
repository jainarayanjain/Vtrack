from django.db import models

from visitor.choices import Type


class NationalIdentityManager(models.Manager):
    """National Identity Manager"""

    def get_queryset(self):
        return super().get_queryset().filter(type=Type.NID)


class VisitorTypeManager(models.Manager):
    """Visitor Type Manager"""

    def get_queryset(self):
        return super().get_queryset().filter(type=Type.VISITOR_TYPE)
