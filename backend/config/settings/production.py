"""
Production settings - Security hardened configuration
"""
from .base import *

# Security: Never run in DEBUG mode in production
DEBUG = False

# Security: Set ALLOWED_HOSTS to your production domain
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')
if not ALLOWED_HOSTS or ALLOWED_HOSTS == ['']:
    raise ValueError("ALLOWED_HOSTS must be set in production environment")

# Security: Require SECRET_KEY in production
if SECRET_KEY == 'django-insecure-change-me-in-production':
    raise ValueError("SECRET_KEY must be set in production environment")

# Security: HTTPS settings
# Allow environment variable override for proxy setups (Vercel, etc)
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'False') == 'True'
# Temporarily disable HSTS for proxy debugging
SECURE_HSTS_SECONDS = int(os.environ.get('SECURE_HSTS_SECONDS', '0'))
SECURE_HSTS_INCLUDE_SUBDOMAINS = os.environ.get('SECURE_HSTS_INCLUDE_SUBDOMAINS', 'False') == 'True'
SECURE_HSTS_PRELOAD = os.environ.get('SECURE_HSTS_PRELOAD', 'False') == 'True'
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Security: Cookie settings for Vercel proxy
# IMPORTANT: Secure=True requires HTTPS, which Vercel provides
SESSION_COOKIE_SECURE = True  # Only send over HTTPS
CSRF_COOKIE_SECURE = True     # Only send over HTTPS
SESSION_COOKIE_HTTPONLY = True  # Prevent JavaScript access
CSRF_COOKIE_HTTPONLY = True     # Prevent JavaScript access
SESSION_COOKIE_SAMESITE = 'Lax' # Protect against CSRF
CSRF_COOKIE_SAMESITE = 'Lax'    # Protect against CSRF

# Cookie domain for Vercel proxy setup
# Use .topthree.club to work with both www.topthree.club and topthree.club
SESSION_COOKIE_DOMAIN = '.topthree.club'
CSRF_COOKIE_DOMAIN = '.topthree.club'

# Cookie paths (inherited from base.py, but explicit here for clarity)
SESSION_COOKIE_PATH = '/'
CSRF_COOKIE_PATH = '/'

# Security: Additional headers
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# CORS: Only allow production frontend
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')
if not CORS_ALLOWED_ORIGINS or CORS_ALLOWED_ORIGINS == ['']:
    raise ValueError("CORS_ALLOWED_ORIGINS must be set in production environment")

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Database: Ensure PostgreSQL in production
if DB_ENGINE == 'sqlite':
    raise ValueError("SQLite is not allowed in production. Use PostgreSQL.")

# Logging: Use console logging in production (Render captures stdout/stderr)
# File logging disabled - Render provides built-in log aggregation
LOGGING['root']['handlers'] = ['console']
LOGGING['loggers']['django']['handlers'] = ['console']







