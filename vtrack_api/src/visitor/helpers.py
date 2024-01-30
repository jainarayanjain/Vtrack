import math
import random

from django.apps import apps
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string


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
        recipient_list: list[str],
        otp: str
        # cc_list: list[str],
) -> None:
    """Send Email"""
    html_file = "approval.html"
    # kwargs = {"approval_instance": approval_instance, "level": message["level"]}
    html_message = render_to_string(html_file)
    mail = EmailMessage(
        subject="subject",
        body=html_message,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list,
        # cc=cc_list,
    )
    mail.content_subtype = "html"
    mail.send()
