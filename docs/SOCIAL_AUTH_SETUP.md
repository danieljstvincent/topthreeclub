# Social Authentication Setup Guide

This guide explains how to set up Google and Facebook OAuth for the TopThree.club application.

## Prerequisites

- Django backend running
- Frontend running
- OAuth credentials from Google and/or Facebook

## Google OAuth Setup

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:8000/accounts/google/login/callback/` (development)
     - `https://yourdomain.com/accounts/google/login/callback/` (production)
   - Copy the Client ID and Client Secret

2. **Set Environment Variables:**
   ```bash
   export GOOGLE_CLIENT_ID="your-google-client-id"
   export GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

   Or add to your `.env` file:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## Facebook OAuth Setup

1. **Create Facebook App:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Click "My Apps" → "Create App"
   - Choose "Consumer" or "Business" type
   - Add "Facebook Login" product
   - Go to Settings → Basic
   - Add your domain to "App Domains"
   - Add "Valid OAuth Redirect URIs":
     - `http://localhost:8000/accounts/facebook/login/callback/` (development)
     - `https://yourdomain.com/accounts/facebook/login/callback/` (production)
   - Copy the App ID and App Secret

2. **Set Environment Variables:**
   ```bash
   export FACEBOOK_APP_ID="your-facebook-app-id"
   export FACEBOOK_APP_SECRET="your-facebook-app-secret"
   ```

   Or add to your `.env` file:
   ```
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   ```

## Django Site Configuration

1. **Set up Django Site:**
   ```bash
   python manage.py shell
   ```
   
   ```python
   from django.contrib.sites.models import Site
   site = Site.objects.get(id=1)
   site.domain = 'localhost:8000'  # or your production domain
   site.name = 'TopThree.club'
   site.save()
   ```

2. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```

## Testing

1. Start the backend server
2. Start the frontend server
3. Click "Login to Sync" on the frontend
4. Click "Continue with Google" or "Continue with Facebook"
5. Complete the OAuth flow
6. You should be redirected back and logged in

## Troubleshooting

- **"Invalid redirect URI"**: Make sure the redirect URI in your OAuth provider matches exactly what's in your Django settings
- **"App not configured"**: Verify your OAuth credentials are set in environment variables
- **"Site not found"**: Run the Django site setup commands above
- **CORS errors**: Make sure CORS is configured correctly in Django settings

## Production Considerations

- Use HTTPS in production
- Update redirect URIs to use your production domain
- Keep OAuth credentials secure (use environment variables, not code)
- Consider using a secrets management service
- Set proper CORS origins for your production domain

