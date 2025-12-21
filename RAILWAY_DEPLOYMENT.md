# 🚂 Railway Deployment Guide

This guide will help you deploy your Django backend to Railway.

## Prerequisites

1. A Railway account ([railway.app](https://railway.app))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Create a Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** (or your Git provider)
4. Select your `topthreeclub` repository
5. Railway will automatically detect it's a Python project

## Step 2: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically provision a PostgreSQL database
4. Note: Railway will automatically set database environment variables

## Step 3: Configure Environment Variables

In your Railway project, go to **Variables** tab and add the following:

### Required Django Settings

```
DJANGO_SETTINGS_MODULE=config.settings.production
SECRET_KEY=your-secret-key-here
```

**Generate a secure SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Domain Configuration

```
ALLOWED_HOSTS=your-app.railway.app,*.railway.app,topthree.club,www.topthree.club
CORS_ALLOWED_ORIGINS=https://topthree.club,https://www.topthree.club,https://your-frontend.vercel.app
```

**Important:** Replace `your-app.railway.app` with your actual Railway domain (you'll get this after first deployment).

### Database Configuration

Railway automatically provides these when you add PostgreSQL, but verify they exist:

```
DB_ENGINE=postgresql
DB_NAME=${PGDATABASE}
DB_USER=${PGUSER}
DB_PASSWORD=${PGPASSWORD}
DB_HOST=${PGHOST}
DB_PORT=${PGPORT}
```

**Note:** Railway uses `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT` by default. Your Django settings will read from these.

### OAuth Configuration (if using social login)

```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Update OAuth redirect URIs:**
- Google: Add `https://your-app.railway.app/accounts/google/login/callback/` to your Google OAuth credentials
- Update `FRONTEND_URL` to your production frontend URL

### Frontend URL

```
FRONTEND_URL=https://topthree.club
```

Replace with your actual frontend URL.

### Stripe Configuration (if using payments)

```
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
STRIPE_PREMIUM_MONTHLY_PRICE_ID=your-monthly-price-id
STRIPE_PREMIUM_YEARLY_PRICE_ID=your-yearly-price-id
```

### Optional Settings

```
DEBUG=False
LOG_LEVEL=INFO
```

## Step 4: Configure Build Settings

Railway should auto-detect the following, but verify:

1. **Root Directory:** Leave empty (or `/`)
2. **Build Command:** Railway will auto-detect and run `pip install -r requirements.txt`
3. **Start Command:** Already configured in `Procfile` and `railway.json`

The deployment will:
1. Install dependencies from `requirements.txt`
2. Run migrations automatically (via `start.sh`)
3. Collect static files automatically (via `start.sh`)
4. Start Gunicorn server

## Step 5: Deploy

1. Railway will automatically deploy when you push to your main branch
2. Or click **"Deploy"** in the Railway dashboard
3. Check the **Deploy Logs** for any errors

## Step 6: Post-Deployment Checklist

- [ ] Verify deployment succeeded in Railway logs
- [ ] Check that migrations ran successfully
- [ ] Test your API endpoints
- [ ] Verify static files are being served
- [ ] Test OAuth login (if applicable)
- [ ] Update OAuth redirect URIs with Railway domain
- [ ] Update `ALLOWED_HOSTS` with your Railway domain
- [ ] Update `CORS_ALLOWED_ORIGINS` with your frontend URL

## Step 7: Set Up Custom Domain (Optional)

1. In Railway, go to your service → **Settings** → **Networking**
2. Click **"Custom Domain"**
3. Add your domain (e.g., `api.topthree.club`)
4. Update DNS records as instructed by Railway
5. Update `ALLOWED_HOSTS` to include your custom domain

## Troubleshooting

### Build Fails

**Error: "No module named 'django'"**
- Check that `requirements.txt` exists in root directory
- Verify Python version in `runtime.txt` matches Railway's supported versions

**Error: "ModuleNotFoundError"**
- Ensure all dependencies are in `requirements/base.txt` or `requirements/production.txt`

### Deployment Fails

**Error: "ALLOWED_HOSTS must be set"**
- Add `ALLOWED_HOSTS` environment variable with your Railway domain
- Include `*.railway.app` to allow Railway's default domain

**Error: "CORS_ALLOWED_ORIGINS must be set"**
- Add `CORS_ALLOWED_ORIGINS` environment variable with your frontend URLs

**Error: "SECRET_KEY must be set"**
- Generate and add `SECRET_KEY` environment variable

### Database Connection Issues

**Error: "could not connect to server"**
- Verify PostgreSQL service is running in Railway
- Check that database environment variables are set correctly
- Railway automatically sets `PGHOST`, `PGDATABASE`, etc. - your Django settings should read from these

### Static Files Not Loading

- Verify `whitenoise` is in `requirements/production.txt` (it is)
- Check that `collectstatic` ran successfully in deployment logs
- Ensure `STATIC_ROOT` is set correctly (it's set to `staticfiles`)

### Migrations Not Running

- Check deployment logs for migration errors
- You can manually run migrations via Railway's CLI:
  ```bash
  railway run python backend/manage.py migrate
  ```

## Railway CLI (Optional)

Install Railway CLI for easier management:

```bash
npm i -g @railway/cli
railway login
railway link  # Link to your project
railway run python backend/manage.py migrate  # Run migrations
railway run python backend/manage.py createsuperuser  # Create admin user
```

## Environment Variables Reference

Here's a complete list of all environment variables you might need:

### Required
- `DJANGO_SETTINGS_MODULE=config.settings.production`
- `SECRET_KEY` (generate a secure key)
- `ALLOWED_HOSTS` (comma-separated list of domains)
- `CORS_ALLOWED_ORIGINS` (comma-separated list of frontend URLs)

### Database (Auto-provided by Railway PostgreSQL)
- `DB_ENGINE=postgresql`
- `DB_NAME` (or use `PGDATABASE`)
- `DB_USER` (or use `PGUSER`)
- `DB_PASSWORD` (or use `PGPASSWORD`)
- `DB_HOST` (or use `PGHOST`)
- `DB_PORT` (or use `PGPORT`)

### OAuth (if using)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Stripe (if using)
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PREMIUM_MONTHLY_PRICE_ID`
- `STRIPE_PREMIUM_YEARLY_PRICE_ID`

### Frontend
- `FRONTEND_URL` (your frontend production URL)

### Optional
- `DEBUG=False`
- `LOG_LEVEL=INFO`

## Files Created for Railway

The following files were created to support Railway deployment:

- `Procfile` - Tells Railway how to start your app
- `runtime.txt` - Specifies Python version
- `requirements.txt` - Root-level requirements file that references backend requirements
- `railway.json` - Railway-specific configuration
- `backend/start.sh` - Startup script that runs migrations, collects static files, and starts Gunicorn

## Support

If you encounter issues:
1. Check Railway deployment logs
2. Verify all environment variables are set
3. Check Django logs in Railway's monitoring section
4. Ensure database is provisioned and connected

