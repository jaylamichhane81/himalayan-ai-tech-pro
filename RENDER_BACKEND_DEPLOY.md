# Render Deployment Configuration - Backend

This file provides step-by-step instructions for deploying the backend to Render.com

## Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Render GitHub Integration**: https://render.com/docs/github
- **PostgreSQL on Render**: https://render.com/docs/databases
- **Environment Variables**: https://render.com/docs/environment-variables

---

## Step 1: Create PostgreSQL Database

### Instructions:
1. Log in to [render.com](https://render.com)
2. Click **New +** button
3. Select **PostgreSQL**
4. Fill in:
   ```
   Name: himalayan-ai-db
   Database: himalayan_db
   User: postgres
   Region: Singapore (or closest to your users)
   Instance Type: Free (for testing) or Standard (production)
   ```
5. Click **Create Database**
6. **IMPORTANT**: Copy the full **External Database URL** (looks like):
   ```
   postgres://user:password@dpg-xxx.onrender.com:5432/himalayan_db
   ```

---

## Step 2: Create Web Service for Backend

### Instructions:
1. Click **New +** button
2. Select **Web Service**
3. Click **Connect a repository** (GitHub)
4. Select your GitHub repo: `himalayan-ai-tech-pro`
5. Fill in settings:
   ```
   Name: himalayan-ai-backend
   Root Directory: backend/
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port 10000
   Instance Type: Free (testing) or Standard (production)
   ```
6. Click **Create Web Service**

---

## Step 3: Add Environment Variables

### In Render Dashboard:

1. Go to your **Web Service** → **Environment** (left sidebar)
2. Add each variable by clicking **Add Environment Variable**

### Required Variables:

```
KEY: DATABASE_URL
VALUE: postgres://user:password@dpg-xxx.onrender.com:5432/himalayan_db

KEY: JWT_SECRET
VALUE: <Generate with: python -c "import secrets; print(secrets.token_urlsafe(32))">

KEY: ADMIN_USERNAME
VALUE: admin

KEY: ADMIN_PASSWORD
VALUE: <Your secure password>

KEY: ALLOWED_ORIGINS
VALUE: https://your-frontend-domain.vercel.app,https://www.your-frontend-domain.vercel.app

KEY: ENVIRONMENT
VALUE: production

KEY: DEBUG
VALUE: false
```

3. Click **Save Changes**
4. **Important**: Render will auto-redeploy with new environment variables

---

## Step 4: Monitor Initial Deployment

### Check logs:
1. Go to Web Service → **Logs** (left sidebar)
2. Watch for messages like:
   ```
   ✓ Database initialized
   INFO: Application startup complete
   INFO: Uvicorn running on http://0.0.0.0:10000
   ```

### If there are errors:
- Check environment variables are set correctly
- Check database URL is accessible
- Verify Python version is 3.8+
- Check `requirements.txt` has all dependencies

---

## Step 5: Test Backend

### Test health endpoint:
```
GET https://your-service-name.onrender.com/
```

Expected response:
```json
{"status": "ok", "message": "Himalayan AI Tech Pro API"}
```

### Test API docs:
```
https://your-service-name.onrender.com/docs
```

Should show interactive Swagger UI with all 31 endpoints.

### Test a protected endpoint:
1. POST to `/auth/login` with:
   ```json
   {
     "username": "admin",
     "password": "your-admin-password"
   }
   ```
2. Should return JWT token
3. Use token in `Authorization: Bearer <token>` header for other endpoints

---

## Step 6: Monitor Performance

### Render Dashboard:

1. **Metrics** tab:
   - CPU usage
   - Memory usage
   - Network traffic

2. **Logs** tab:
   - Real-time application logs
   - Error tracking

3. **Events** tab:
   - Deployment history
   - Service restarts

### Alerts to set up:

```
[ ] CPU usage > 80%
[ ] Memory usage > 500MB
[ ] Response time > 2 seconds
[ ] Error rate > 1%
```

---

## Step 7: Enable Auto-Deployment

### Automatic updates from GitHub:

1. Web Service → **Settings**
2. **Build & Deploy**
3. Under **Deploy Hooks**, Render should auto-detect GitHub
4. Every push to `main` branch will trigger deployment

### Manual re-deployment:

1. Web Service → **Manual Deploy**
2. Select branch (usually `main`)
3. Click **Deploy Latest Commit**

---

## Step 8: Upgrade Database (Optional)

Free PostgreSQL tier has 1GB limit. To upgrade:

1. Database → **Settings**
2. **Plan**: Select paid plan
3. Render migrates data automatically (no downtime)

---

## Troubleshooting

### Error: "Database connection refused"
- [ ] Verify `DATABASE_URL` is correct
- [ ] Check database is running (green icon in Render)
- [ ] Verify database user/password matches
- [ ] Check firewall allows Render IP

### Error: "ModuleNotFoundError"
- [ ] Ensure all packages in `requirements.txt`
- [ ] Check Python version is 3.8+
- [ ] Run `pip install -r requirements.txt` locally to verify

### Error: "Port already in use"
- [ ] Render usually handles this
- [ ] Check Start Command uses port from environment

### Service keeps restarting
- [ ] Check logs for errors
- [ ] Increase memory/CPU allocation
- [ ] Check for infinite loops in code

### Environment variables not loading
- [ ] Make sure to click **Save Changes** after adding variables
- [ ] Service auto-redeploys, but manual redeploy also works
- [ ] Check variable names are spelled exactly right (case-sensitive)

---

## Production Checklist

Before going live:

```
[ ] PostgreSQL database created and accessible
[ ] Environment variables set (all 6 required ones)
[ ] Build logs show no errors
[ ] Health check endpoint responds correctly
[ ] Auth endpoint works (can get JWT token)
[ ] All CRUD operations tested
[ ] CORS properly configured for frontend domain
[ ] Debug mode is false
[ ] Database backup plan in place
[ ] Monitoring/alerts configured
[ ] Custom domain configured (optional)
```

---

## Cost (as of 2026)

```
Free Tier:
  Web Service: $0/month
  PostgreSQL: $0/month (1GB limit)
  
Paid Tier (recommended for production):
  Web Service: ~$7-67/month (depending on specs)
  PostgreSQL: ~$15-200+/month (depending on size)
```

---

## Important Links

- Render Documentation: https://render.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com
- PostgreSQL Docs: https://www.postgresql.org/docs
- Support: support@render.com
