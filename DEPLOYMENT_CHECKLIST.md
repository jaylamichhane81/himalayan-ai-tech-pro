# 🚀 DEPLOYMENT CHECKLIST - 5 STEPS TO GO LIVE

## ✅ PRE-DEPLOYMENT STATUS
- ✅ GitHub repository synced: https://github.com/jaylamichhane81/himalayan-ai-tech-pro
- ✅ All code committed (working tree clean)
- ✅ Frontend: Next.js 15.5.9 production-ready
- ✅ Backend: FastAPI production-ready
- ✅ Documentation: Complete

---

## 📋 STEP 1: DEPLOY FRONTEND TO VERCEL

### 1.1 Create Vercel Account
- Go to https://vercel.com/signup
- Sign up with GitHub account (recommended for easy deployment)
- Authorize Vercel to access your GitHub repositories

### 1.2 Import Project to Vercel
- Click "New Project"
- Select your GitHub repository: `himalayan-ai-tech-pro`
- Select the `frontend` folder as the root directory
- Click "Import"

### 1.3 Configure Environment Variables
In Vercel dashboard, add:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.render.com
```

### 1.4 Deploy
- Click "Deploy"
- Wait for build to complete (usually 2-5 minutes)
- Your frontend is now live at: `https://<your-project>.vercel.app`

**✅ STEP 1 COMPLETE** - Frontend live on Vercel

---

## ⚙️ STEP 2: DEPLOY BACKEND TO RENDER

### 2.1 Create Render Account
- Go to https://render.com/signup
- Sign up with GitHub account (recommended)
- Authorize Render to access repositories

### 2.2 Create New Web Service
- Click "New +" → "Web Service"
- Select your GitHub repository: `himalayan-ai-tech-pro`
- Connect with GitHub

### 2.3 Configure Service
- **Name:** `himalayan-ai-tech-pro-backend`
- **Environment:** Python 3.9+
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 10000`
- **Root Directory:** `backend`

### 2.4 Add Environment Variables
In Render dashboard, add:
```
DATABASE_URL=postgresql://user:password@your-database-host:5432/himalayan_ai
ALLOWED_ORIGINS=https://<your-vercel-domain>.vercel.app,https://yourdomain.com
SECRET=your-secure-jwt-secret-key
```

### 2.5 Deploy
- Click "Create Web Service"
- Wait for build and deployment (usually 3-5 minutes)
- Your backend is now live at: `https://himalayan-ai-tech-pro-backend.onrender.com`

**✅ STEP 2 COMPLETE** - Backend live on Render

---

## 🌐 STEP 3: CONFIGURE CUSTOM DOMAIN

### 3.1 Purchase Domain (if not already owned)
- Go to domain registrar: GoDaddy, Namecheap, Google Domains, etc.
- Search and purchase your domain (e.g., `himalayanatech.com`)

### 3.2 Point Domain to Frontend (Vercel)
**In Vercel Dashboard:**
- Project Settings → Domains
- Add your domain
- Follow Vercel's instructions to add DNS records

**Common DNS Records to Add:**
```
Type: A
Name: @
Value: 76.76.19.89

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 Point Subdomain to Backend (Render)
**In Render Dashboard:**
- Service Settings → Custom Domains
- Add subdomain: `api.yourdomain.com`
- Add CNAME record to your DNS:
```
Type: CNAME
Name: api
Value: your-render-url.onrender.com
```

### 3.4 Update Environment Variables
**Update Vercel:**
- Set `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`

**Update Render:**
- Add to `ALLOWED_ORIGINS`: `https://yourdomain.com,https://www.yourdomain.com`

**✅ STEP 3 COMPLETE** - Custom domain configured

---

## 🗄️ STEP 4: SETUP DATABASE (PostgreSQL)

### 4.1 Create PostgreSQL Database

**Option A: Using Render (Recommended)**
- Go to Render dashboard
- Click "New +" → "PostgreSQL"
- Choose free tier or paid plan
- Region: Choose closest to your location
- Click "Create Database"
- Copy the connection string (DATABASE_URL)

**Option B: Using Railway**
- Go to https://railway.app
- Sign up with GitHub
- Create new project
- Add PostgreSQL database
- Copy connection string

**Option C: Using PlanetScale / Other Services**
- Follow their setup guide
- Get the connection string

### 4.2 Update Backend Environment Variables
In Render/Railway dashboard, add:
```
DATABASE_URL=postgresql://user:password@host:5432/database_name
```

### 4.3 Initialize Database (First Time Only)
If you have migrations, run:
```bash
# From backend directory
python -m alembic upgrade head
```

**✅ STEP 4 COMPLETE** - PostgreSQL database ready

---

## 🎉 STEP 5: FINAL VERIFICATION & GO LIVE

### 5.1 Test Frontend
- Visit: `https://yourdomain.com`
- Check:
  - ✅ Page loads correctly
  - ✅ All components visible
  - ✅ Mobile responsive
  - ✅ Animations smooth

### 5.2 Test Backend
- Visit: `https://api.yourdomain.com/docs`
- You should see FastAPI swagger documentation
- Check:
  - ✅ All endpoints visible
  - ✅ Documentation complete

### 5.3 Test API Integration
- Go to frontend contact form
- Fill in form and submit
- Check:
  - ✅ Form submits successfully
  - ✅ Backend receives data
  - ✅ Success message appears

### 5.4 Test Admin Dashboard
- Visit: `https://yourdomain.com/admin`
- Login with credentials: `admin / admin123`
- Check:
  - ✅ Dashboard loads
  - ✅ Statistics display
  - ✅ Contact messages appear

### 5.5 Monitor & Maintain
- Set up monitoring: Render/Vercel built-in monitoring
- Watch error logs
- Monitor database usage
- Set up automated backups

**✅ STEP 5 COMPLETE** - LIVE & VERIFIED! 🚀

---

## 📞 POST-DEPLOYMENT TASKS

### Security Checklist
- [ ] Change default admin credentials
- [ ] Update JWT secret to strong random key
- [ ] Configure email notifications
- [ ] Enable rate limiting
- [ ] Setup SSL/HTTPS (auto with Vercel & Render)

### Analytics & Monitoring
- [ ] Add Google Analytics
- [ ] Setup error logging (Sentry recommended)
- [ ] Monitor performance metrics
- [ ] Track user interactions

### Content & Marketing
- [ ] Update contact email
- [ ] Add company information
- [ ] Setup email notifications for contact forms
- [ ] Configure payment gateways (Khalti/eSewa)

---

## 🆘 TROUBLESHOOTING

### Frontend Won't Build
- Check Node.js version: `node --version` (should be 16+)
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

### Backend Won't Start
- Check Python version: `python --version` (should be 3.9+)
- Check requirements: `pip install -r requirements.txt`
- Check port: Make sure 10000 is available

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` in Vercel settings
- Check CORS origins in backend
- Verify firewall/security groups allow traffic

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check username/password
- Verify network access allowed
- Check database exists

---

## 📚 USEFUL LINKS

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://docs.render.com
- FastAPI Docs: https://fastapi.tiangolo.com
- Next.js Docs: https://nextjs.org/docs
- PostgreSQL Docs: https://www.postgresql.org/docs

---

## ✅ FINAL CHECKLIST

```
Step 1: Frontend Deployment (Vercel)     [ ] Done
Step 2: Backend Deployment (Render)      [ ] Done
Step 3: Custom Domain Setup              [ ] Done
Step 4: PostgreSQL Database              [ ] Done
Step 5: Final Verification & Go Live     [ ] Done

BONUS TASKS:
- Change admin credentials               [ ] Done
- Setup monitoring & alerts              [ ] Done
- Configure email notifications          [ ] Done
- Setup payment gateways                 [ ] Done

🎉 WEBSITE LIVE & READY FOR CLIENTS!
```

---

**Need help with any step? All deployment files are configured and ready!**

**Your Next Steps:**
1. Create accounts on Vercel & Render
2. Follow steps 1-5 above
3. Monitor your deployed application
4. Enjoy your live website! 🚀
