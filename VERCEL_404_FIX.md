# Fixing Vercel 404 NOT_FOUND Error

## 🔍 Problem
You're getting a `404: NOT_FOUND` error from Vercel. This happens when Vercel can't find your Next.js pages directory.

## ✅ Solution

### Step 1: Configure Root Directory in Vercel Dashboard

1. Go to your project on [vercel.com](https://vercel.com)
2. Click on **Settings** → **General**
3. Scroll down to **Root Directory**
4. Set it to: `frontend`
5. Click **Save**

### Step 2: Verify vercel.json Configuration

I've created a `vercel.json` at the project root that specifies the root directory. Make sure it exists and contains:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "devCommand": "cd frontend && npm run dev",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs",
  "rootDirectory": "frontend"
}
```

### Step 3: Redeploy

After changing the root directory:
1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

## 🔧 Alternative: Deploy from frontend/ Directory

If the above doesn't work, you can deploy directly from the frontend directory:

1. **Using Vercel CLI:**
   ```bash
   cd frontend
   vercel --prod
   ```

2. **Using Vercel Dashboard:**
   - Create a new project
   - Point it directly to the `frontend` folder
   - Or use a monorepo setup

## 📋 Verification Checklist

After redeploying, verify:

- [ ] Root Directory is set to `frontend` in Vercel settings
- [ ] Build logs show "Creating an optimized production build"
- [ ] Build completes successfully
- [ ] Homepage (`/`) loads correctly
- [ ] Other routes (`/login`, `/signup`, `/dashboard`) work

## 🐛 Common Issues

### Issue: Still getting 404 after setting root directory
**Solution:** 
- Clear Vercel cache: Settings → General → Clear Build Cache
- Redeploy

### Issue: Build fails
**Solution:**
- Check build logs in Vercel dashboard
- Verify `package.json` exists in `frontend/`
- Ensure all dependencies are listed

### Issue: Pages not found
**Solution:**
- Verify `src/pages/` directory exists
- Check that all page files export a default React component
- Ensure `_app.tsx` exists in `src/pages/`

## 📝 Quick Fix Command

If using Vercel CLI from the project root:

```bash
# From project root
vercel --cwd frontend --prod
```

Or navigate to frontend first:

```bash
cd frontend
vercel --prod
```

## 🎯 Expected Result

After fixing, you should see:
- ✅ Successful build
- ✅ All routes working (`/`, `/login`, `/signup`, `/dashboard`)
- ✅ No 404 errors





