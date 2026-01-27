# PRODUCTION DEPLOYMENT GUIDE - Full Stack

## Phase 1: Pre-Deployment Checklist

```
[ ] GitHub repository is public
[ ] Code is pushed to main/master branch
[ ] .env files are in .gitignore
[ ] No secrets in git history
[ ] Backend and Frontend have their own environments
[ ] PostgreSQL database ready
```

---

## Phase 2: Backend Deployment (Render.com)

### Step 1: Create PostgreSQL Database on Render
1. Go to render.com → Dashboard
2. Create new → PostgreSQL
3. Name: `himalayan-ai-db`
4. Instance Type: Free (or paid for production)
5. Copy the **Internal Database URL** (for backups)
6. Save the **External Database URL** (starts with `postgres://`)

### Step 2: Create Backend Web Service
1. Go to Render → New → Web Service
2. Connect your GitHub repository
3. Fill in:
   ```
   Name: himalayan-ai-backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port 10000
   Instance Type: Free (or paid)
   ```

### Step 3: Set Environment Variables
In Render Dashboard → Web Service Settings → Environment:

```
DATABASE_URL=postgresql://username:password@host:5432/dbname
JWT_SECRET=your-super-secret-key-min-32-chars-long-here
ADMIN_USERNAME=your-secure-username
ADMIN_PASSWORD=your-secure-password-min-8-chars
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

**Generate secure secrets:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 4: Deploy Backend
- Push changes to GitHub
- Render auto-deploys from main branch
- Check logs for "Application startup complete"
- Backend URL: `https://your-backend-name.onrender.com`

---

## Phase 3: Frontend Deployment (Vercel.com)

### Step 1: Create Vercel Project
1. Go to vercel.com → Dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Root Directory: `frontend/`

### Step 2: Set Environment Variables
In Project Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
NEXT_PUBLIC_APP_URL=https://your-frontend-name.vercel.app
```

### Step 3: Configure Build Settings
```
Build Command: npm run build
Start Command: npm start
Install Command: npm ci
```

### Step 4: Deploy Frontend
- Click "Deploy"
- Vercel builds and deploys automatically
- Frontend URL: `https://your-project.vercel.app`

---

## Phase 4: Domain Configuration (Optional)

### Add Custom Domain to Vercel
1. Vercel Dashboard → Project Settings → Domains
2. Add custom domain (e.g., `app.example.com`)
3. Update DNS records at your domain provider
4. Vercel provides DNS records to add

### Add Custom Domain to Render
1. Render Dashboard → Web Service → Settings
2. Add custom domain (e.g., `api.example.com`)
3. Update DNS records
4. Add SSL certificate (automatic via Render)

---

## Phase 5: Database Setup

### Initial Schema Creation
The backend automatically creates tables on startup via the lifespan context manager in `main.py`.

### Backup Strategy
```bash
# Manual PostgreSQL backup
pg_dump postgresql://user:password@host:5432/dbname > backup.sql

# Restore
psql postgresql://user:password@host:5432/dbname < backup.sql
```

### Monitor Database
- Use Render's PostgreSQL dashboard
- Check connection logs
- Monitor storage usage (free tier: 1GB)

---

## Phase 6: Security Hardening

### Update CORS
Backend `main.py` already supports production domains via `ALLOWED_ORIGINS` env var.

### Enable HTTPS
- ✅ Render: Auto-enabled for *.onrender.com
- ✅ Vercel: Auto-enabled for *.vercel.app
- Custom domains get free SSL via Let's Encrypt

### Secure JWT Secret
- Generate: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- Store in Render Environment Variables (not in code)
- Rotate regularly in production

### Rate Limiting (Optional)
Add to backend `main.py` if needed:
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
```

---

## Phase 7: Monitoring & Logs

### Render Logs
- Dashboard → Web Service → Logs
- Real-time application output
- Error tracking

### Vercel Logs
- Dashboard → Deployments → Logs
- Build logs and runtime logs
- Function invocations

### Error Tracking (Optional)
Add to backend:
```python
import sentry_sdk
sentry_sdk.init("your-sentry-dsn")
```

---

## Phase 8: CI/CD Setup

### Automatic Deployments
- Render auto-deploys from GitHub main branch
- Vercel auto-deploys from GitHub main branch
- Push to GitHub = automatic production update

### Preview Deployments
Vercel creates preview URLs for pull requests.

### Rollback Strategy
- Render: Re-deploy from previous commit
- Vercel: Rollback from Deployments tab

---

## Production Environment Variables Reference

### Backend (.env in Render)
```
# Database
DATABASE_URL=postgresql://user:pass@host/dbname

# Security
JWT_SECRET=<32+ char random string>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<secure password>

# CORS
ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com

# App
NODE_ENV=production
DEBUG=false
```

### Frontend (.env in Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
```

---

## Troubleshooting

### "Failed to fetch" Error
- Check CORS origins match frontend domain
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is actually running (Render logs)

### Database Connection Error
- Verify `DATABASE_URL` format is correct
- Check PostgreSQL is running
- Test connection manually

### Build Failures
- Check logs in Render/Vercel dashboard
- Ensure all dependencies in `requirements.txt` or `package.json`
- Verify build commands are correct

### Environment Variables Not Found
- Redeploy after adding variables
- Restart service after changes
- Double-check variable names (case-sensitive)

---

## Performance Optimization

### Frontend (Vercel)
- ✅ Auto-optimized images
- ✅ Automatic code splitting
- ✅ Edge caching
- ✅ ISR (Incremental Static Regeneration)

### Backend (Render)
- Add database connection pooling
- Implement caching (Redis)
- Use CDN for static files
- Monitor API response times

---

## Cost Estimation (Free Tier)

```
Render Backend:   $0/month (Free tier)
Render Database:  $0/month (Free PostgreSQL)
Vercel Frontend:  $0/month (Free tier)
Custom Domain:    ~$10-15/year (external)
─────────────────────────────────
TOTAL:           ~$10-15/year
```

For production scale, upgrade to paid plans.

---

## After Deployment

✅ Test all endpoints: `https://your-backend.onrender.com/docs`
✅ Test frontend: `https://your-frontend.vercel.app`
✅ Test form submission
✅ Test login
✅ Test contact form
✅ Monitor logs for errors
✅ Set up regular backups
✅ Plan database upgrades

---

## Support & Next Steps

- Render Support: https://render.com/support
- Vercel Support: https://vercel.com/support
- FastAPI Docs: https://fastapi.tiangolo.com
- Next.js Docs: https://nextjs.org/docs
