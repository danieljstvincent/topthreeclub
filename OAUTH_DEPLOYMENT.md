# OAuth Deployment Guide

This guide explains how to configure OAuth providers (Google, Facebook) for the Top Three Club application in production environments.

## Overview

The application uses Django Allauth for OAuth authentication. OAuth providers require configuration in both:
1. **Django Settings** - Provider configuration in `settings.py`
2. **Database** - `SocialApp` records that store OAuth credentials

## Automated Configuration

We've created a Django management command that automatically configures OAuth providers from environment variables during deployment.

### Management Command

```bash
python manage.py configure_socialapps
```

This command:
- ✅ Reads OAuth credentials from environment variables
- ✅ Creates or updates `SocialApp` database records
- ✅ Links OAuth apps to your Django site
- ✅ Is idempotent (safe to run multiple times)
- ✅ Works for both local development and production

### Command Options

```bash
# Configure all available OAuth providers
python manage.py configure_socialapps

# Skip Google OAuth configuration
python manage.py configure_socialapps --skip-google

# Skip Facebook OAuth configuration
python manage.py configure_socialapps --skip-facebook

# Use a different site ID (default is 1)
python manage.py configure_socialapps --site-id 2
```

## Environment Variables

### Required for Google OAuth

```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Required for Facebook OAuth

```bash
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### Other Required Variables

```bash
FRONTEND_URL=https://your-frontend-domain.com
SECRET_KEY=your-django-secret-key
DEBUG=False  # Important for production!
```

## Deployment Steps

### 1. Local Development

The `.env` file already contains OAuth credentials for localhost development.

```bash
# Activate virtual environment
source venv/bin/activate

# Run migrations
python manage.py migrate

# Configure OAuth apps
python manage.py configure_socialapps

# Start the development server
python manage.py runserver
```

### 2. Production Deployment (Render, Heroku, etc.)

#### Step 1: Set Environment Variables

In your hosting platform (Render, Heroku, etc.), add these environment variables:

```bash
GOOGLE_CLIENT_ID=<your-production-google-client-id>
GOOGLE_CLIENT_SECRET=<your-production-google-secret>
FACEBOOK_APP_ID=<your-production-facebook-app-id>
FACEBOOK_APP_SECRET=<your-production-facebook-secret>
FRONTEND_URL=https://your-production-frontend.com
SECRET_KEY=<generate-a-strong-secret-key>
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.com
```

#### Step 2: Update OAuth Provider Settings

**Google Cloud Console** (https://console.cloud.google.com/)
1. Go to "Credentials" in your Google Cloud project
2. Edit your OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - Development: `http://localhost:8000/accounts/google/login/callback/`
   - Production: `https://your-backend-domain.com/accounts/google/login/callback/`
4. Add authorized JavaScript origins:
   - Development: `http://localhost:3000`
   - Production: `https://your-frontend-domain.com`

**Facebook Developers** (https://developers.facebook.com/)
1. Go to your Facebook App settings
2. Navigate to Facebook Login > Settings
3. Add Valid OAuth Redirect URIs:
   - Development: `http://localhost:8000/accounts/facebook/login/callback/`
   - Production: `https://your-backend-domain.com/accounts/facebook/login/callback/`
4. Add App Domains:
   - `localhost`
   - `your-backend-domain.com`
   - `your-frontend-domain.com`

#### Step 3: Update Build/Deploy Script

Add the configuration command to your deployment process.

**For Render** (in `render.yaml` or build command):
```bash
python manage.py migrate && python manage.py configure_socialapps
```

**For Heroku** (in `Procfile` release phase):
```yaml
release: python manage.py migrate && python manage.py configure_socialapps
web: gunicorn config.wsgi:application
```

**For Docker** (in entrypoint script):
```bash
#!/bin/bash
python manage.py migrate
python manage.py configure_socialapps
python manage.py collectstatic --noinput
exec "$@"
```

### 3. Manual Configuration (Alternative)

If you prefer not to use the management command, you can configure OAuth apps via Django Admin:

1. Navigate to `/admin/` on your backend
2. Go to "Sites" and ensure your production domain is configured
3. Go to "Social Applications" → "Add Social Application"
4. For Google:
   - Provider: Google
   - Name: Google
   - Client ID: `<your-google-client-id>`
   - Secret Key: `<your-google-secret>`
   - Sites: Select your site
5. Repeat for Facebook if needed

## Verification

After deployment, verify OAuth is working:

### 1. Check Database Configuration

```bash
# SSH into your production server or use Django shell
python manage.py shell

from allauth.socialaccount.models import SocialApp
apps = SocialApp.objects.all()
for app in apps:
    print(f"{app.provider}: {app.client_id[:20]}...")
```

### 2. Test OAuth Flow

1. Go to your frontend login page
2. Click "Continue with Google" or "Continue with Facebook"
3. Complete the OAuth consent screen
4. Verify you're redirected back and logged in successfully

### 3. Check for Errors

Monitor your application logs for OAuth-related errors:
- Missing `client_id` errors → Check environment variables
- Redirect URI mismatch → Update OAuth provider settings
- CORS errors → Check `CORS_ALLOWED_ORIGINS` in Django settings

## Troubleshooting

### Error: "Missing required parameter: client_id"

**Cause**: `SocialApp` not configured in database

**Solution**: Run the configuration command:
```bash
python manage.py configure_socialapps
```

### Error: "Redirect URI mismatch"

**Cause**: OAuth provider doesn't recognize the callback URL

**Solution**:
1. Check your OAuth provider settings (Google Cloud Console / Facebook Developers)
2. Ensure redirect URIs match exactly: `https://your-domain.com/accounts/google/login/callback/`
3. Don't forget the trailing slash!

### Error: "Origin not allowed"

**Cause**: CORS configuration issue

**Solution**: Check `CORS_ALLOWED_ORIGINS` in [base.py](backend/config/settings/base.py):
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
    "https://accounts.google.com",
    "https://www.facebook.com",
]
```

### OAuth Works Locally But Not in Production

**Checklist**:
- [ ] Environment variables set in production
- [ ] `configure_socialapps` command run after deployment
- [ ] Production redirect URIs added to OAuth provider settings
- [ ] HTTPS enabled (OAuth providers often require HTTPS in production)
- [ ] `FRONTEND_URL` environment variable points to production frontend
- [ ] Django Site domain configured correctly

## Security Best Practices

1. **Never commit OAuth secrets to version control**
   - Use `.env` for local development
   - Use environment variables for production
   - Ensure `.env` is in `.gitignore`

2. **Use different OAuth credentials for development and production**
   - Create separate OAuth apps for each environment
   - This prevents security issues and makes debugging easier

3. **Enable HTTPS in production**
   - OAuth providers require HTTPS for security
   - Use SSL/TLS certificates from Let's Encrypt or your hosting provider

4. **Regularly rotate secrets**
   - Periodically regenerate OAuth secrets
   - Update environment variables when rotating

5. **Limit OAuth scopes**
   - Only request necessary permissions (profile, email)
   - Current configuration in [base.py](backend/config/settings/base.py):
     ```python
     'SCOPE': ['profile', 'email']
     ```

## Additional Resources

- [Django Allauth Documentation](https://docs.allauth.org/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- Management Command Source: [configure_socialapps.py](backend/apps/users/management/commands/configure_socialapps.py)

## Support

If you encounter issues:
1. Check application logs for detailed error messages
2. Verify all environment variables are set correctly
3. Run `python manage.py configure_socialapps` to reconfigure
4. Check OAuth provider dashboards for authentication attempts and errors
