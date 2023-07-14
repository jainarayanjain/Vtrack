from django.db import models
from django.utils.translation import gettext_lazy


class Kind(models.IntegerChoices):
    """Kind Choices"""

    CATEGORY = 0, gettext_lazy("Category")
    NID = 1, gettext_lazy("National Identity")
    PURPOSE = 2, gettext_lazy("Purpose")
