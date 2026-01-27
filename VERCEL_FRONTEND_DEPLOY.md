# Vercel Deployment Configuration - Frontend

This file provides step-by-step instructions for deploying the frontend to Vercel.com

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel GitHub Integration**: https://vercel.com/docs/concepts/git
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables

---

## Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Grant Vercel access to your GitHub account
4. You should see your repositories listed

---

## Step 2: Create New Project

### Instructions:

1. Click **Add New...** → **Project**
2. Find your repository: `himalayan-ai-tech-pro`
3. Click **Import**
4. Vercel should auto-detect Next.js framework
5. Fill in project settings:
   ```
   Project Name: himalayan-ai-tech-pro
   Framework: Next.js
   Root Directory: frontend/
   ```
6. Click **Continue**

---

## Step 3: Configure Build Settings

### Vercel auto-detects these for Next.js:

```
Build Command: next build
Start Command: next start
Installation Command: npm ci
```

If not auto-detected, set them manually:

1. **Settings** → **Build & Development Settings**
2. Ensure:
   ```
   Framework: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm ci
   ```
3. Click **Save**

---

## Step 4: Add Environment Variables

### In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add each variable by clicking **Add**

### Required Variables:

```
NAME: NEXT_PUBLIC_API_URL
VALUE: https://your-backend-name.onrender.com
ENVIRONMENTS: Production, Preview, Development
```

Add this too (optional but recommended):

```
NAME: NEXT_PUBLIC_APP_URL
VALUE: https://your-project.vercel.app
ENVIRONMENTS: Production, Preview, Development
```

3. Click **Save**

---

## Step 5: Deploy

### Option A: Automatic Deployment

1. After adding environment variables, Vercel will show **Deploy** button
2. Click **Deploy**
3. Wait for build to complete (~2-5 minutes)
4. View deployment logs in **Deployments** tab

### Option B: Manual Deployment

1. Go to **Deployments** tab
2. Click **Deploy**
3. Select branch (usually `main`)
4. Click **Deploy**

### Deployment Complete When:

```
✓ Build: PASSED
✓ Ready for Production
✓ URL: https://your-project.vercel.app
```

---

## Step 6: Verify Deployment

### Test frontend:
1. Open: https://your-project.vercel.app
2. Should see homepage with all components
3. Check browser console (F12) for errors

### Test API connection:
1. Try submitting contact form
2. Check network tab (F12) for API calls
3. Should call `https://your-backend-name.onrender.com/contact/`

### If "Failed to Fetch" error:
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Check backend CORS includes frontend domain
3. Verify backend is running on Render
4. Redeploy frontend after fixing

---

## Step 7: Custom Domain (Optional)

### Add custom domain:

1. Go to **Settings** → **Domains**
2. Click **Add**
3. Enter your domain: `app.example.com`
4. Vercel shows DNS records to add

### Update DNS records:

At your domain provider (GoDaddy, Namecheap, etc.):

1. Add **CNAME** record:
   ```
   Name: app
   Value: cname.vercel.com
   ```

2. Or add **A** records (if CNAME not available):
   ```
   Type: A
   Name: app
   Value: 76.76.19.1 (Vercel IP, may change)
   ```

3. Wait 24-48 hours for DNS propagation
4. Vercel will auto-enable SSL certificate

### Verify custom domain:
- Visit `https://app.example.com`
- Should show your app with SSL certificate

---

## Step 8: Monitor Deployments

### Vercel Dashboard:

1. **Deployments** tab:
   - View all deployments
   - See build logs
   - Rollback to previous version

2. **Analytics** tab:
   - Page speed
   - Web Vitals
   - Usage metrics

3. **Functions** (if using API routes):
   - Function invocations
   - Performance
   - Errors

---

## Step 9: Enable Preview Deployments

### Automatic preview URLs for pull requests:

1. **Settings** → **Git**
2. **Preview Deployments**:
   ```
   [ ] Automatically deploy Pull Requests
   ```
3. Check this box (usually pre-enabled)

### Result:
- Every PR gets a preview URL
- Share with team for testing before merging
- Auto-removed when PR closes

---

## Step 10: Error Tracking (Optional)

### Enable Sentry for frontend errors:

1. Go to [sentry.io](https://sentry.io)
2. Create project for Next.js
3. Copy Sentry DSN
4. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
   ```
5. Redeploy

---

## Troubleshooting

### Error: "Build failed"
- [ ] Check build logs for specific error
- [ ] Verify all dependencies in `package.json`
- [ ] Check TypeScript errors: `npm run type-check`
- [ ] Check linting errors: `npm run lint`

### Error: "API calls failing"
- [ ] Verify `NEXT_PUBLIC_API_URL` is set correctly
- [ ] Check backend CORS configuration
- [ ] Verify backend is running and accessible
- [ ] Check for missing trailing slash in URL

### Error: "Deployment taking too long"
- [ ] Free tier may have slower builds
- [ ] Upgrade to Pro if needed
- [ ] Check for large dependencies
- [ ] Optimize bundle size

### Error: "Custom domain not working"
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Check DNS records are correct
- [ ] Verify domain CNAME/A records
- [ ] Check domain not already in use

### Blank page after deployment
- [ ] Check browser console (F12) for errors
- [ ] Check network tab for failed requests
- [ ] Verify `NEXT_PUBLIC_API_URL` is accessible
- [ ] Check app is fetching data correctly

---

## Production Checklist

Before going live:

```
[ ] Frontend builds successfully locally
[ ] All environment variables set in Vercel
[ ] NEXT_PUBLIC_API_URL points to production backend
[ ] Contact form submission works end-to-end
[ ] Admin login works
[ ] All pages load correctly
[ ] No console errors
[ ] Responsive design works (mobile, tablet, desktop)
[ ] Web Vitals are good (< 2.5s LCP, < 0.1s CLS)
[ ] SSL certificate active (https://)
[ ] Custom domain working (if applicable)
[ ] Analytics enabled
[ ] Error tracking setup
[ ] Rollback plan in place
```

---

## Cost (as of 2026)

```
Free Tier:
  - Unlimited deployments
  - Automatic HTTPS
  - Custom domains
  - Preview deployments
  - Good for most projects

Pro Tier ($20/month):
  - Priority support
  - More analytics
  - Team collaboration
  - Priority builds

Enterprise:
  - Custom pricing
  - SLA support
  - Advanced features
```

---

## Important Links

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Next.js Deployment Guide: https://nextjs.org/docs/deployment
- Support: support@vercel.com

---

## Quick Reference

### Deploy latest from GitHub:
```bash
git push origin main
# Vercel auto-deploys in 1-2 minutes
```

### Manual trigger redeploy:
1. Vercel Dashboard → Deployments
2. Click three dots → Redeploy
3. Select branch and click Redeploy

### Rollback to previous version:
1. Vercel Dashboard → Deployments
2. Find previous deployment
3. Click → Promote to Production

### Check build logs:
1. Vercel Dashboard → Deployments
2. Click deployment name
3. View Build Logs section
