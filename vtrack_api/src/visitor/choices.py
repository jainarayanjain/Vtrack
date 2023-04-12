from django.db import models
from django.utils.translation import gettext_lazy


class Type(models.IntegerChoices):
    """Type Choices"""

    VISITOR_TYPE = 0, gettext_lazy("Visitor Type")
    NID = 1, gettext_lazy("National Identity")
