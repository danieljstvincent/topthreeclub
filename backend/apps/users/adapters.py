from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from django.contrib.auth import get_user_model
import random
import string

User = get_user_model()


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    """Custom adapter for social account handling"""
    
    def pre_social_login(self, request, sociallogin):
        """Called before social login"""
        # Auto-connect if user is already logged in
        if request.user.is_authenticated:
            sociallogin.connect(request, request.user)
    
    def _generate_unique_username(self, base_username):
        """Generate a unique username by appending numbers if needed"""
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
            # Safety limit to prevent infinite loops
            if counter > 1000:
                # If we hit the limit, add random string
                random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
                username = f"{base_username}_{random_suffix}"
                break
        return username
    
    def populate_user(self, request, sociallogin, data):
        """Populate user from social account data"""
        user = super().populate_user(request, sociallogin, data)
        
        # Set username from email or name if not provided
        if not user.username:
            if data.get('email'):
                # Use email prefix as base username
                base_username = data['email'].split('@')[0]
                # Remove any characters that aren't allowed in usernames
                base_username = ''.join(c for c in base_username if c.isalnum() or c in '._-')[:150]
                user.username = self._generate_unique_username(base_username)
            elif data.get('name'):
                # Use name as base username
                base_username = data['name'].lower().replace(' ', '_')
                base_username = ''.join(c for c in base_username if c.isalnum() or c in '._-')[:150]
                user.username = self._generate_unique_username(base_username)
            else:
                # Fallback: use provider and uid
                base_username = f"user_{sociallogin.account.provider}_{sociallogin.account.uid[:8]}"
                user.username = self._generate_unique_username(base_username)
        else:
            # Ensure existing username is unique (in case of conflicts)
            if User.objects.filter(username=user.username).exclude(pk=user.pk if user.pk else None).exists():
                user.username = self._generate_unique_username(user.username)
        
        return user
    
    def save_user(self, request, sociallogin, form=None):
        """Save the user after social login"""
        # Call parent to save user
        user = super().save_user(request, sociallogin, form)
        # Ensure username is set and unique
        if not user.username:
            # Generate username if not set
            if user.email:
                base_username = user.email.split('@')[0]
                base_username = ''.join(c for c in base_username if c.isalnum() or c in '._-')[:150]
                user.username = self._generate_unique_username(base_username)
            else:
                user.username = self._generate_unique_username(f"user_{sociallogin.account.provider}_{sociallogin.account.uid[:8]}")
            user.save()
        return user
    
    def get_connect_redirect_url(self, request, socialaccount):
        """Redirect after connecting social account"""
        return settings.LOGIN_REDIRECT_URL
    
    def get_redirect_url(self, request):
        """Redirect after social login"""
        return settings.LOGIN_REDIRECT_URL
    
    def authentication_error(self, request, provider_id, error=None, exception=None, extra_context=None):
        """Handle authentication errors"""
        # Log the error but don't raise - let allauth handle it
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"OAuth authentication error for {provider_id}: {error}")
        return super().authentication_error(request, provider_id, error, exception, extra_context)
    
    def is_auto_signup_allowed(self, request, sociallogin):
        """Allow automatic signup for social accounts"""
        return True


class AccountAdapter(DefaultAccountAdapter):
    """Custom account adapter"""
    
    def get_login_redirect_url(self, request):
        """Redirect to frontend after login"""
        return settings.LOGIN_REDIRECT_URL

