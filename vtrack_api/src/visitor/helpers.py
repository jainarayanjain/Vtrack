import random

from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from visitor.models import VisitorDetail


def generate_otp(length: int = 4) -> str:
    """Generates otp"""
    otp = ""
    for i in range(length):
        otp += str(random.randint(0, 9))
    return otp


def check_otp(user_input: str, otp) -> bool:
    """Checks otp"""
    if user_input == otp:
        return True


def through_email(
        instance,
        subject: str,
        template: str,
) -> None:
    """Send Email"""
    html_file = f"{template}.html"
    visitor_instance = VisitorDetail.objects.get(approval__host__id=instance.id)
    kwargs = {"instance": visitor_instance}
    html_message = render_to_string(html_file, kwargs)
    recipient_list = [instance.email]
    mail = EmailMessage(
        subject=subject,
        body=html_message,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list
    )
    mail.content_subtype = "html"
    mail.send()
