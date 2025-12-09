# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Your app is ready for Vercel deployment! Here's what's been verified:

- ✅ Build succeeds (`npm run build`)
- ✅ All pages have valid React components
- ✅ `vercel.json` configuration exists
- ✅ Environment variables are properly configured
- ✅ Next.js 14 is properly set up

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production: `vercel --prod`

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your repository**

5. **Configure the project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` (important!)
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

6. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-api.com`
   - Make sure to add it for Production, Preview, and Development

7. **Deploy!**

## 🔧 Required Environment Variables

You **must** set these in Vercel's dashboard:

### `NEXT_PUBLIC_API_URL`
- **Production**: Your production backend API URL (e.g., `https://api.yourdomain.com`)
- **Preview**: Your staging/development API URL
- **Development**: `http://localhost:8000` (for local dev)

**Important**: 
- The variable name must start with `NEXT_PUBLIC_` to be accessible in the browser
- Update this in: Project Settings → Environment Variables

## 📋 Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Authentication works (login/signup)
- [ ] API calls are working (check browser console for errors)
- [ ] CORS is configured on your backend to allow your Vercel domain
- [ ] Environment variables are set correctly

## 🔒 Backend CORS Configuration

Make sure your Django backend allows requests from your Vercel domain:

```python
# In your Django settings
CORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",
    "https://www.yourdomain.com",  # if using custom domain
]
```

Or for development:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-app.vercel.app",
]
```

## 🐛 Troubleshooting

### Build Fails
- Check that you're deploying from the `frontend` directory
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### API Calls Fail
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on backend
- Check browser console for specific errors

### Pages Not Loading
- Verify all pages export a default React component
- Check Next.js build logs for errors

## 📝 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_API_URL` if needed

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to your main branch. For preview deployments on pull requests, this is enabled by default.

## 📚 Additional Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)






