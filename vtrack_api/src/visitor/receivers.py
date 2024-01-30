from django.db.models.signals import post_save
from django.dispatch import receiver

from visitor.models import Valid, VisitorDetail
from visitor.helpers import generate_otp, through_email


@receiver(post_save, sender=VisitorDetail)
def visitor_post_save(sender, instance, created, **kwargs):
    """Visitor Post Save: For validating otp"""
    if created:
        otp = generate_otp(4)
        through_email(['sureshsharmainnova@gmail.com'], otp)
        valid = Valid(visitor=instance, otp=otp)
        valid.save()
