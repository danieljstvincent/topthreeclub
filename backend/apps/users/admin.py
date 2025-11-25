from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, QuestProgress


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass


@admin.register(QuestProgress)
class QuestProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'quest_1_completed', 'quest_2_completed', 'quest_3_completed', 'updated_at')
    list_filter = ('date', 'updated_at')
    search_fields = ('user__username', 'user__email')
    date_hierarchy = 'date'

