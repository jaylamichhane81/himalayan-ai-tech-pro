# PRODUCTION DEPLOYMENT - QUICK START GUIDE

## 🚀 Deploy in 10 Minutes

### Step 1: Prepare (2 minutes)
```bash
# Ensure all code is pushed to GitHub
git push origin main

# Verify no secrets in code
grep -r "password\|secret\|token" . --include="*.py" --include="*.ts" --include="*.tsx"
# (Should only see examples/comments, not real values)
```

### Step 2: Create PostgreSQL on Render (2 minutes)
1. Go to [render.com](https://render.com) → Dashboard
2. **New +** → **PostgreSQL**
3. Name: `himalayan-ai-db`
4. Copy the **External Database URL**

### Step 3: Deploy Backend (3 minutes)
1. **New +** → **Web Service**
2. Connect your GitHub repo
3. Set:
   - Root Directory: `backend/`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
4. **Create Web Service**
5. Add Environment Variables (while it builds):
   ```
   DATABASE_URL=<paste PostgreSQL URL>
   JWT_SECRET=<generate random 32 chars>
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=<your secure password>
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```
6. Test: Open `https://your-service.onrender.com/docs`

### Step 4: Deploy Frontend (3 minutes)
1. Go to [vercel.com](https://vercel.com) → Dashboard
2. **Add New** → **Project**
3. Import your GitHub repo
4. Root Directory: `frontend/`
5. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
   ```
6. **Deploy**
7. Test: Open your Vercel URL

### Step 5: Verify (0 minutes - automatic)
- Backend should show "✓ Database initialized"
- Frontend should load with no errors
- Contact form should work end-to-end

---

## 📋 Environment Variables Quick Reference

### Backend (Render)
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=<32 random chars>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<your password>
ALLOWED_ORIGINS=https://your-app.vercel.app
ENVIRONMENT=production
DEBUG=false
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🔍 Verify Deployment

### Test Backend API
```bash
curl https://your-backend.onrender.com/

# Should return: {"status": "ok"}
```

### Test Frontend
Open `https://your-app.vercel.app` in browser

### Test End-to-End
1. Submit contact form
2. Check should appear in database
3. Try admin login

---

## 🚨 If Something Goes Wrong

### "Failed to Fetch"
1. Check `NEXT_PUBLIC_API_URL` is correct in Vercel
2. Check `ALLOWED_ORIGINS` includes Vercel domain in Render
3. Verify backend is running (check Render logs)

### "Database Connection Error"
1. Check `DATABASE_URL` format is correct
2. Verify PostgreSQL is running (green icon in Render)
3. Test connection manually

### Build Failures
1. Check Render/Vercel logs for specific error
2. Verify all dependencies in requirements.txt / package.json
3. Check Python version is 3.8+

---

## 📚 Full Documentation

For more details, see:
- [PRODUCTION_DEPLOYMENT_FULL.md](PRODUCTION_DEPLOYMENT_FULL.md) - Complete guide
- [RENDER_BACKEND_DEPLOY.md](RENDER_BACKEND_DEPLOY.md) - Backend deployment
- [VERCEL_FRONTEND_DEPLOY.md](VERCEL_FRONTEND_DEPLOY.md) - Frontend deployment
- [ENVIRONMENT_VARIABLES_PROD.md](ENVIRONMENT_VARIABLES_PROD.md) - All env vars
- [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Pre-launch checklist

---

## 💡 Pro Tips

✅ **Use regex CORS pattern** for development (easier for testing)
✅ **Keep JWT_SECRET secure** - change it regularly in production
✅ **Enable database backups** - Render does this automatically
✅ **Monitor logs** - Check Render/Vercel dashboards regularly
✅ **Version your deploys** - Tag releases in GitHub for rollback
✅ **Test before deploying** - Always verify locally first

---

## 🎯 You're Ready!

Your production deployment is now configured and ready to go live. 🚀

**Status**: ✅ READY FOR PRODUCTION

---

**Next Steps**:
1. Follow the "Quick Start" steps above (10 minutes)
2. Test everything works
3. Share your production URLs
4. Monitor for any issues
5. Update DNS for custom domains (optional)
