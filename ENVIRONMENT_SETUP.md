# Environment Variables Setup Guide

This guide lists all environment variables that need to be configured for production deployment.

## Frontend (Vercel)

### Required Environment Variables

1. **NEXT_PUBLIC_API_URL**
   - **Description**: Backend API URL
   - **Example**: `https://api.topthree.club`
   - **How to set**: Vercel Dashboard → Your Project → Settings → Environment Variables
   - **Apply to**: Production, Preview, Development

### How to Set in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter the variable name and value
6. Select which environments to apply to
7. Click **Save**
8. **Redeploy** your application for changes to take effect

---

## Backend (Your Hosting Platform)

### Required Environment Variables

1. **ALLOWED_HOSTS**
   - **Description**: Comma-separated list of allowed hostnames
   - **Example**: `www.topthree.club,topthree.club,api.topthree.club`
   - **Note**: Already includes production domains by default, but you can override

2. **SECRET_KEY**
   - **Description**: Django secret key (generate a new one for production)
   - **How to generate**: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
   - **Important**: Never use the default value in production!

3. **FRONTEND_URL**
   - **Description**: Frontend URL for OAuth redirects
   - **Example**: `https://www.topthree.club`

4. **BACKEND_URL** (Optional but recommended)
   - **Description**: Backend URL for generating OAuth URLs
   - **Example**: `https://api.topthree.club`
   - **Note**: Will auto-detect from request if not set

### Database Configuration

5. **DB_ENGINE**
   - **Description**: Database engine (`postgresql` or `sqlite`)
   - **Production**: Must be `postgresql`
   - **Example**: `postgresql`

6. **DB_NAME**
   - **Description**: Database name
   - **Example**: `topthreeclub`

7. **DB_USER**
   - **Description**: Database user
   - **Example**: `postgres`

8. **DB_PASSWORD**
   - **Description**: Database password
   - **Important**: Keep this secure!

9. **DB_HOST**
   - **Description**: Database host
   - **Example**: `db.example.com` or `localhost`

10. **DB_PORT**
    - **Description**: Database port
    - **Default**: `5432`

### Email Configuration (Required for Password Reset)

11. **EMAIL_BACKEND**
    - **Description**: Email backend to use
    - **Production**: `django.core.mail.backends.smtp.EmailBackend`
    - **Development**: `django.core.mail.backends.console.EmailBackend`

12. **EMAIL_HOST**
    - **Description**: SMTP server hostname
    - **Example**: `smtp.gmail.com` or `smtp.sendgrid.net`

13. **EMAIL_PORT**
    - **Description**: SMTP server port
    - **Common values**: `587` (TLS) or `465` (SSL)

14. **EMAIL_USE_TLS**
    - **Description**: Use TLS encryption
    - **Value**: `True` or `False`

15. **EMAIL_USE_SSL**
    - **Description**: Use SSL encryption
    - **Value**: `True` or `False`
    - **Note**: Use either TLS or SSL, not both

16. **EMAIL_HOST_USER**
    - **Description**: SMTP username/email
    - **Example**: `noreply@topthree.club`

17. **EMAIL_HOST_PASSWORD**
    - **Description**: SMTP password
    - **Important**: Keep this secure!

18. **DEFAULT_FROM_EMAIL**
    - **Description**: Default sender email address
    - **Example**: `noreply@topthree.club`

### OAuth Configuration

19. **GOOGLE_CLIENT_ID**
    - **Description**: Google OAuth Client ID
    - **Where to get**: [Google Cloud Console](https://console.cloud.google.com/)

20. **GOOGLE_CLIENT_SECRET**
    - **Description**: Google OAuth Client Secret
    - **Where to get**: [Google Cloud Console](https://console.cloud.google.com/)

### Security Settings (Production)

21. **DEBUG**
    - **Description**: Debug mode
    - **Production**: Must be `False`
    - **Value**: `False`

22. **SECURE_SSL_REDIRECT**
    - **Description**: Redirect HTTP to HTTPS
    - **Production**: Should be `True`
    - **Value**: `True`

---

## Quick Setup Checklist

### Frontend (Vercel)
- [ ] Set `NEXT_PUBLIC_API_URL` to your backend API URL
- [ ] Redeploy application

### Backend
- [ ] Set `ALLOWED_HOSTS` (or use default which includes production domains)
- [ ] Set `SECRET_KEY` (generate a new one!)
- [ ] Set `FRONTEND_URL`
- [ ] Configure database variables (`DB_*`)
- [ ] Configure email/SMTP variables (`EMAIL_*`)
- [ ] Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] Set `DEBUG=False` for production
- [ ] Update Django Site domain in admin panel

### Google OAuth
- [ ] Update redirect URIs in Google Cloud Console to production URLs
- [ ] Verify OAuth credentials are set in backend environment

---

## Testing After Setup

1. **Frontend**: Visit your site - should load without connection errors
2. **OAuth**: Try Google login - should redirect correctly
3. **Password Reset**: Try forgot password - should send email
4. **Console**: Check browser console - no errors

---

## Common Issues

### "Connection Refused" Errors
- **Cause**: `NEXT_PUBLIC_API_URL` not set in Vercel
- **Fix**: Set the environment variable and redeploy

### Password Reset Emails Not Sending
- **Cause**: Email backend not configured
- **Fix**: Set `EMAIL_BACKEND` and SMTP settings

### OAuth Redirect Errors
- **Cause**: Redirect URIs not updated in Google Console
- **Fix**: Update redirect URIs to production URLs

### CORS Errors
- **Cause**: Frontend domain not in `CORS_ALLOWED_ORIGINS`
- **Fix**: Already configured, but verify `FRONTEND_URL` is set correctly

---

## Support

If you encounter issues:
1. Check server logs for error messages
2. Verify all environment variables are set correctly
3. Ensure you've redeployed after setting environment variables
4. Check that URLs match exactly (including https/http and trailing slashes)




