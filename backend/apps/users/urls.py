from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('me/', views.current_user_view, name='current_user'),
    path('social-auth-urls/', views.social_auth_urls_view, name='social_auth_urls'),
    path('quests/today/', views.quest_progress_view, name='quest_progress'),
    path('quests/lock-choices/', views.lock_choices_view, name='lock_choices'),
    path('quests/submit/', views.submit_quest_view, name='submit_quest'),
    path('quests/history/', views.quest_history_view, name='quest_history'),
    path('quests/stats/', views.quest_stats_view, name='quest_stats'),
    path('quests/bulk-sync/', views.quest_bulk_sync_view, name='quest_bulk_sync'),
    path('account/delete/', views.delete_account_view, name='delete_account'),
]

