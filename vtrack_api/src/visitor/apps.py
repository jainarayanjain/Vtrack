from django.apps import AppConfig


class VisitorConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "visitor"

    def ready(self):
        from visitor.signals import visitor_signal
        from visitor.receivers import visitor_post_save

        visitor_signal.connect(visitor_post_save)
