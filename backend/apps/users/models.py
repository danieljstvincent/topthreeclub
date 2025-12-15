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

