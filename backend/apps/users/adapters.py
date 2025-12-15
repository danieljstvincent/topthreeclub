from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    """Custom adapter for social account handling"""
    
    def pre_social_login(self, request, sociallogin):
        """Called before social login"""
        # Auto-connect if user is already logged in
        if request.user.is_authenticated:
            sociallogin.connect(request, request.user)
    
    def populate_user(self, request, sociallogin, data):
        """Populate user from social account data"""
        user = super().populate_user(request, sociallogin, data)
        
        # Set username from email or name if not provided
        if not user.username:
            if data.get('email'):
                user.username = data['email'].split('@')[0]
            elif data.get('name'):
                user.username = data['name'].lower().replace(' ', '_')
            else:
                user.username = f"user_{sociallogin.account.provider}_{sociallogin.account.uid[:8]}"
        
        return user
    
    def get_connect_redirect_url(self, request, socialaccount):
        """Redirect after connecting social account"""
        return settings.LOGIN_REDIRECT_URL
    
    def is_auto_signup_allowed(self, request, sociallogin):
        """Allow automatic signup for social accounts"""
        return True


class AccountAdapter(DefaultAccountAdapter):
    """Custom account adapter"""
    
    def get_login_redirect_url(self, request):
        """Redirect to frontend after login"""
        return settings.LOGIN_REDIRECT_URL

