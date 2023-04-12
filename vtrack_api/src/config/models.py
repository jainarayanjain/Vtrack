from django.db import models
from django.utils.translation import gettext_lazy


class Item(models.Model):
    """Item Model: Stores config items"""

    app = models.CharField(gettext_lazy("app"), max_length=50)
    section = models.CharField(gettext_lazy("section"), max_length=50)
    sub_section = models.CharField(gettext_lazy("sub section"), max_length=50)
    key = models.CharField(gettext_lazy("key"), max_length=50)
    description = models.TextField(gettext_lazy("description"))
    value = models.JSONField(gettext_lazy("value"))
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["app", "section", "sub_section", "key"], name="unique_config"
            )
        ]

    def __str__(self):
        return ":".join([self.app, self.section, self.sub_section, self.key])

    @staticmethod
    def get_value(unique_config, default=None):
        try:
            app, section, sub_section, key = unique_config.split(":")
            obj = Item.objects.get(
                app=app, section=section, sub_section=sub_section, key=key
            )
            return obj.value
        except (AttributeError, Item.DoesNotExist, ValueError):
            return default
