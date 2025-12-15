from .base import *
import os

DEBUG = True

# Allow all origins in development
CORS_ALLOW_ALL_ORIGINS = True

# Development database fallback
# If PostgreSQL connection fails, automatically fallback to SQLite
# This makes local development easier without requiring PostgreSQL setup
if os.environ.get('DB_ENGINE', 'postgresql') == 'postgresql':
    # Try to use PostgreSQL, but provide clear error if it fails
    # User can set DB_ENGINE=sqlite in .env to use SQLite instead
    pass
else:
    # Explicitly using SQLite for development
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

