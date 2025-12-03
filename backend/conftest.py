"""
Pytest configuration and shared fixtures
"""
import pytest
import os
import django
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

# Configure Django settings for pytest
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.testing')
django.setup()

User = get_user_model()


@pytest.fixture(autouse=True)
def enable_db_access_for_all_tests(db):
    """
    Give all tests access to the database.
    This fixture is automatically used for all tests.
    """
    pass


@pytest.fixture
def api_client():
    """Create an API client for testing"""
    return APIClient()


@pytest.fixture
def user():
    """Create a test user"""
    return User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )


@pytest.fixture
def authenticated_client(api_client, user):
    """Create an authenticated API client"""
    api_client.force_authenticate(user=user)
    return api_client



