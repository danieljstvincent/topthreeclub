from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model"""
    pass


class QuestProgress(models.Model):
    """Track daily quest progress for users"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quest_progress')
    date = models.DateField()
    quest_1_text = models.CharField(max_length=255, blank=True, default='')
    quest_2_text = models.CharField(max_length=255, blank=True, default='')
    quest_3_text = models.CharField(max_length=255, blank=True, default='')
    quest_1_completed = models.BooleanField(default=False)
    quest_2_completed = models.BooleanField(default=False)
    quest_3_completed = models.BooleanField(default=False)
    submitted = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(null=True, blank=True)
    choices_locked = models.BooleanField(default=False)
    choices_locked_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']
        indexes = [
            models.Index(fields=['user', 'date']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.date}"


class Subscription(models.Model):
    """User subscription for premium features"""

    class Tier(models.TextChoices):
        FREE = 'free', 'Free'
        PREMIUM = 'premium', 'Premium'

    class BillingInterval(models.TextChoices):
        MONTHLY = 'monthly', 'Monthly'
        YEARLY = 'yearly', 'Yearly'

    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        CANCELED = 'canceled', 'Canceled'
        PAST_DUE = 'past_due', 'Past Due'
        INCOMPLETE = 'incomplete', 'Incomplete'

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    tier = models.CharField(max_length=20, choices=Tier.choices, default=Tier.FREE)
    billing_interval = models.CharField(
        max_length=20,
        choices=BillingInterval.choices,
        null=True,
        blank=True
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    current_period_start = models.DateTimeField(null=True, blank=True)
    current_period_end = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.tier}"

    @property
    def is_premium(self):
        return self.tier == self.Tier.PREMIUM and self.status == self.Status.ACTIVE

