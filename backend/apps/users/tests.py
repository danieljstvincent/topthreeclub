import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date, timedelta
from .models import QuestProgress

User = get_user_model()


@pytest.mark.django_db
class TestUserRegistration:
    """Test user registration endpoint"""

    def test_register_success(self, api_client):
        """Test successful user registration"""
        url = reverse('users:register')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'ComplexPass123!',
            'password2': 'ComplexPass123!',
        }
        response = api_client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert 'user' in response.data
        assert response.data['user']['username'] == 'newuser'
        assert 'password' not in response.data['user']

    def test_register_password_mismatch(self, api_client):
        """Test registration with mismatched passwords"""
        url = reverse('users:register')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'ComplexPass123!',
            'password2': 'DifferentPass123!',
        }
        response = api_client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'password' in response.data

    def test_register_duplicate_username(self, api_client, user):
        """Test registration with duplicate username"""
        url = reverse('users:register')
        data = {
            'username': 'testuser',
            'email': 'different@example.com',
            'password': 'ComplexPass123!',
            'password2': 'ComplexPass123!',
        }
        response = api_client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestUserLogin:
    """Test user login endpoint"""

    def test_login_success(self, api_client, user):
        """Test successful login"""
        url = reverse('users:login')
        data = {
            'username': 'testuser',
            'password': 'testpass123',
        }
        response = api_client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert 'user' in response.data

    def test_login_invalid_credentials(self, api_client, user):
        """Test login with invalid credentials"""
        url = reverse('users:login')
        data = {
            'username': 'testuser',
            'password': 'wrongpassword',
        }
        response = api_client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'Invalid credentials' in str(response.data)


@pytest.mark.django_db
class TestQuestProgress:
    """Test quest progress endpoints"""

    def test_get_today_quest_progress(self, authenticated_client, user):
        """Test getting today's quest progress"""
        url = reverse('users:quest_progress')
        response = authenticated_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert 'date' in response.data

    def test_create_quest_progress(self, authenticated_client, user):
        """Test creating quest progress for today"""
        url = reverse('users:quest_progress')
        data = {
            'quest_1_text': 'First quest',
            'quest_2_text': 'Second quest',
            'quest_3_text': 'Third quest',
            'quest_1_completed': True,
            'quest_2_completed': False,
            'quest_3_completed': True,
        }
        response = authenticated_client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['quest_1_text'] == 'First quest'
        assert response.data['quest_1_completed'] is True

    def test_update_quest_progress(self, authenticated_client, user):
        """Test updating quest progress"""
        # Create initial progress
        progress = QuestProgress.objects.create(
            user=user,
            date=date.today(),
            quest_1_text='Original text',
            quest_1_completed=False,
        )
        
        url = reverse('users:quest_progress')
        data = {
            'quest_1_text': 'Updated text',
            'quest_1_completed': True,
        }
        response = authenticated_client.put(url, data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['quest_1_text'] == 'Updated text'
        assert response.data['quest_1_completed'] is True

    def test_submit_quest_progress(self, authenticated_client, user):
        """Test submitting quest progress"""
        # Create progress with all quests completed
        progress = QuestProgress.objects.create(
            user=user,
            date=date.today(),
            quest_1_completed=True,
            quest_2_completed=True,
            quest_3_completed=True,
        )
        
        url = reverse('users:submit_quest')
        response = authenticated_client.post(url, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['message'] == 'Successfully submitted!'
        
        # Verify submission was saved
        progress.refresh_from_db()
        assert progress.submitted is True
        assert progress.submitted_at is not None

    def test_submit_already_submitted(self, authenticated_client, user):
        """Test submitting quest progress that was already submitted"""
        progress = QuestProgress.objects.create(
            user=user,
            date=date.today(),
            submitted=True,
        )
        
        url = reverse('users:submit_quest')
        response = authenticated_client.post(url, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'already submitted' in response.data['error'].lower()

    def test_quest_stats(self, authenticated_client, user):
        """Test getting quest statistics"""
        # Create some quest progress
        today = date.today()
        for i in range(3):
            QuestProgress.objects.create(
                user=user,
                date=today - timedelta(days=i),
                quest_1_completed=True,
                quest_2_completed=True,
                quest_3_completed=True,
            )
        
        url = reverse('users:quest_stats')
        response = authenticated_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert 'streak' in response.data
        assert 'total_xp' in response.data
        assert response.data['streak'] >= 1
        assert response.data['total_xp'] >= 9  # 3 quests * 3 days


@pytest.mark.django_db
class TestQuestProgressModel:
    """Test QuestProgress model"""

    def test_quest_progress_creation(self, user):
        """Test creating a QuestProgress instance"""
        progress = QuestProgress.objects.create(
            user=user,
            date=date.today(),
            quest_1_text='Test quest',
            quest_1_completed=True,
        )
        
        assert progress.user == user
        assert progress.date == date.today()
        assert progress.quest_1_text == 'Test quest'
        assert progress.quest_1_completed is True
        assert progress.submitted is False

    def test_quest_progress_unique_constraint(self, user):
        """Test that user can only have one quest progress per date"""
        QuestProgress.objects.create(
            user=user,
            date=date.today(),
        )
        
        with pytest.raises(Exception):  # Should raise IntegrityError
            QuestProgress.objects.create(
                user=user,
                date=date.today(),
            )

    def test_quest_progress_str_representation(self, user):
        """Test string representation of QuestProgress"""
        progress = QuestProgress.objects.create(
            user=user,
            date=date.today(),
        )
        
        assert str(progress) == f"{user.username} - {date.today()}"


@pytest.mark.django_db
class TestUserSerializer:
    """Test user serializers"""

    def test_user_serializer_validation(self):
        """Test UserSerializer password validation"""
        from .serializers import UserSerializer
        
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
        }
        serializer = UserSerializer(data=data)
        assert serializer.is_valid()

    def test_user_serializer_password_mismatch(self):
        """Test UserSerializer with mismatched passwords"""
        from .serializers import UserSerializer
        
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'password2': 'differentpass',
        }
        serializer = UserSerializer(data=data)
        assert not serializer.is_valid()
        assert 'password' in serializer.errors

    def test_login_serializer_validation(self, user):
        """Test LoginSerializer validation"""
        from .serializers import LoginSerializer
        
        data = {
            'username': 'testuser',
            'password': 'testpass123',
        }
        serializer = LoginSerializer(data=data)
        assert serializer.is_valid()
        assert 'user' in serializer.validated_data

    def test_login_serializer_invalid_credentials(self):
        """Test LoginSerializer with invalid credentials"""
        from .serializers import LoginSerializer
        
        data = {
            'username': 'nonexistent',
            'password': 'wrongpass',
        }
        serializer = LoginSerializer(data=data)
        assert not serializer.is_valid()







