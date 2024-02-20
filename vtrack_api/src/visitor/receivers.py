from django.db.models.signals import post_save
from django.dispatch import receiver

from visitor.models import Approval, Valid, VisitorDetail
from visitor.helpers import generate_otp, through_email


@receiver(post_save, sender=VisitorDetail)
def visitor_post_save(sender, instance, created, **kwargs):
    """Visitor Post Save: For validating otp"""
    if created:
        otp = generate_otp(4)
        subject = "OTP for login"
        template = "otp"
        valid = Valid(visitor=instance, otp=otp)
        valid.save()
        through_email(instance, subject, template)


@receiver(post_save, sender=Approval)
def approval_post_save(sender, instance, created, **kwargs):
    """Approval Post Save: Requesting for approval via email"""
    if created:
        subject = "Request for approval"
        template = "approval"
        through_email(instance, subject, template)
