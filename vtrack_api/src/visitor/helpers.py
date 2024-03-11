import os
from pathlib import Path, PurePath
import random

from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


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
        recipient_list: list,
) -> None:
    """Send Email"""
    html_file = f"{template}.html"
    kwargs = {"instance": instance}
    html_message = render_to_string(html_file, kwargs)
    recipient_list = recipient_list
    mail = EmailMessage(
        subject=subject,
        body=html_message,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list
    )
    mail.content_subtype = "html"
    mail.send()


def through_email_with_image(
        instance,
        subject: str,
        template: str,
        recipient_list: list,
) -> None:
    """Send Email"""

    image_url = instance.visitor.photo.url
    image_url.replace("//", "\\")
    absolute_path = str(Path.cwd().parent)
    image_path = absolute_path + image_url
    with open(image_path, 'rb') as f:
        image_data = f.read()

    html_file = f"{template}.html"
    kwargs = {"instance": instance}
    html_message = render_to_string(html_file, kwargs)

    recipient_list = recipient_list
    img = MIMEImage(image_data, 'jpeg')
    img.add_header('Content-Id', '<myimage>')
    img.add_header("Content-Disposition", "inline", filename="myimage")

    body = MIMEText(html_message, _subtype='html')
    html_part = MIMEMultipart(_subtype='related')

    html_part.attach(body)
    html_part.attach(img)

    mail = EmailMessage(
        subject=subject,
        body=None,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list
    )
    mail.content_subtype = "html"
    mail.attach(html_part)
    mail.send()

