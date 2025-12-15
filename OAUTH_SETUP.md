# OAuth Setup Guide

This guide will help you set up Google and Facebook OAuth authentication for Top Three Club.

## Table of Contents
- [Google OAuth Setup](#google-oauth-setup)
- [Facebook OAuth Setup](#facebook-oauth-setup)
- [Backend Configuration](#backend-configuration)
- [Testing OAuth](#testing-oauth)

---

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Enter project name: `Top Three Club` (or your preferred name)
4. Click **Create**

### 2. Enable Google+ API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and press **Enable**

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (unless you have a Google Workspace account)
3. Fill in the required fields:
   - **App name**: Top Three Club
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Add scopes:
   - `userinfo.email`
   - `userinfo.profile`
5. Add test users (for development):
   - Add email addresses that you'll use for testing
6. Click **Save and Continue**

### 4. Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: Top Three Club Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:8000` (for local development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:8000/accounts/google/login/callback/` (local)
     - `https://yourdomain.com/accounts/google/login/callback/` (production)
5. Click **Create**
6. Copy your **Client ID** and **Client Secret**

### 5. Add to Environment Variables

Add to your `backend/.env` file:

```bash
GOOGLE_CLIENT_ID=your-googlt-client-id-here.apps.googleuserconten.com
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

---

## Facebook OAuth Setup

### 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose **Consumer** as the app type
4. Fill in:
   - **App name**: Top Three Club
   - **App contact email**: Your email
5. Click **Create App**

### 2. Add Facebook Login Product

1. In your app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** as the platform
4. Enter your site URL: `http://localhost:3000` (for development)

### 3. Configure Facebook Login Settings

1. Go to **Products** → **Facebook Login** → **Settings**
2. Add **Valid OAuth Redirect URIs**:
   - `http://localhost:8000/accounts/facebook/login/callback/` (local)
   - `https://yourdomain.com/accounts/facebook/login/callback/` (production)
3. Save changes

### 4. Get App Credentials

1. Go to **Settings** → **Basic**
2. Copy your **App ID** and **App Secret**
   - You may need to click **Show** for the App Secret

### 5. Add to Environment Variables

Add to your `backend/.env` file:

```bash
FACEBOOK_APP_ID=your-facebook-app-id-here
FACEBOOK_APP_SECRET=your-facebook-app-secret-here
```

### 6. Configure App Domain (Development)

For local development, you need to add `localhost` to your Facebook app:

1. Go to **Settings** → **Basic**
2. Add **App Domains**: `localhost`
3. For **Privacy Policy URL** and **Terms of Service URL**, you can use placeholder URLs during development:
   - `http://localhost:3000/privacy`
   - `http://localhost:3000/terms`

---

## Backend Configuration

### 1. Verify Django Allauth Installation

The project already has Django Allauth configured. Verify in `backend/config/settings/base.py`:

```python
INSTALLED_APPS = [
    # ...
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',
    # ...
]
```

### 2. Set Up Site Domain

1. Start your Django server: `python manage.py runserver`
2. Go to Django admin: `http://localhost:8000/admin/`
3. Navigate to **Sites** → **example.com** (or the default site)
4. Edit it to:
   - **Domain name**: `localhost:8000` (for development)
   - **Display name**: `Top Three Club`
5. Save

### 3. Verify Allauth URLs

The URLs are already configured in `backend/config/urls.py`. The OAuth endpoints are:
- Google: `http://localhost:8000/accounts/google/login/`
- Facebook: `http://localhost:8000/accounts/facebook/login/`

---

## Testing OAuth

### 1. Test Google Login

1. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   python manage.py runserver

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Go to `http://localhost:3000/login`
3. Click **Continue with Google**
4. You should be redirected to Google's login page
5. Sign in with your Google account (must be a test user if app is not published)
6. You should be redirected back to the dashboard

### 2. Test Facebook Login

1. Go to `http://localhost:3000/login`
2. Click **Continue with Facebook**
3. You should be redirected to Facebook's login page
4. Sign in with your Facebook account
5. Grant permissions to the app
6. You should be redirected back to the dashboard

---

## Common Issues

### Issue: "Redirect URI mismatch"
**Solution**: Make sure the redirect URIs in your OAuth provider settings exactly match:
- Google: `http://localhost:8000/accounts/google/login/callback/`
- Facebook: `http://localhost:8000/accounts/facebook/login/callback/`

### Issue: "App Not Set Up" on Facebook
**Solution**:
1. Make sure you added `localhost` to **App Domains** in Facebook app settings
2. Add Privacy Policy and Terms URLs (can be placeholders for development)

### Issue: "Access blocked: This app's request is invalid"
**Solution**: For Google, make sure you:
1. Added your email as a test user in OAuth consent screen
2. Enabled the Google+ API
3. Set the correct redirect URIs

### Issue: User created but redirect fails
**Solution**: Check that `LOGIN_REDIRECT_URL` in `backend/config/settings/base.py` is set to:
```python
LOGIN_REDIRECT_URL = 'http://localhost:3000/auth-callback'
```

---

## Production Deployment

When deploying to production:

1. **Update Redirect URIs** in both Google and Facebook:
   - Replace `http://localhost:8000` with your production backend URL
   - Example: `https://api.yourdomain.com/accounts/google/login/callback/`

2. **Update Environment Variables**:
   ```bash
   FRONTEND_URL=https://yourdomain.com
   ```

3. **Update Django Site**:
   - In Django admin, update the site domain to your production domain

4. **Facebook App Review**:
   - For Facebook, you'll need to submit your app for review to make it public
   - Until then, only test users and app administrators can log in

5. **Google OAuth Verification**:
   - Google may require app verification if you're requesting sensitive scopes
   - For basic profile and email, verification is usually not needed

---

## Security Notes

- **Never commit** your OAuth credentials to version control
- Use `.env` files and add them to `.gitignore`
- For production, use environment variables from your hosting platform
- Rotate secrets periodically
- Monitor OAuth app usage in provider dashboards

---

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Django server logs for backend errors
3. Verify all environment variables are set correctly
4. Ensure redirect URIs match exactly (including trailing slashes)

For more help, consult:
- [Django Allauth Documentation](https://django-allauth.readthedocs.io/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
