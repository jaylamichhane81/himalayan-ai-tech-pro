# PRODUCTION DEPLOYMENT CHECKLIST

Complete this checklist before deploying to production.

---

## PRE-DEPLOYMENT (Local)

### Code Quality
- [ ] All code pushed to GitHub `main` branch
- [ ] No uncommitted changes
- [ ] All console.log statements removed
- [ ] No hardcoded secrets in code
- [ ] TypeScript compiles with no errors: `npm run type-check`
- [ ] No ESLint errors: `npm run lint`

### Security
- [ ] `.env` files NOT in git (check `.gitignore`)
- [ ] `.env.local` NOT in git
- [ ] `node_modules/` NOT in git
- [ ] `.venv/` NOT in git
- [ ] No API keys in code
- [ ] No database passwords in code
- [ ] JWT secret is 32+ characters
- [ ] Database password is strong (8+ chars, mixed case, numbers, symbols)

### Testing
- [ ] Local backend starts without errors
- [ ] Local frontend starts without errors
- [ ] Contact form works end-to-end
- [ ] Admin login works
- [ ] All API endpoints respond correctly
- [ ] No "failed to fetch" errors
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Forms validate correctly
- [ ] Error messages display properly

### Dependencies
- [ ] `backend/requirements.txt` up to date
- [ ] `frontend/package.json` up to date
- [ ] All production dependencies included
- [ ] No development-only packages in production list
- [ ] Versions pinned (no `*` or `^` ranges)

### Documentation
- [ ] README.md is accurate
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Setup instructions clear
- [ ] Deployment instructions complete

---

## DATABASE SETUP (Render)

### PostgreSQL Database
- [ ] Created Render PostgreSQL instance
- [ ] Database name: `himalayan_db`
- [ ] User created and password set
- [ ] External Database URL copied
- [ ] Connection tested locally with:
  ```bash
  psql postgres://user:password@host:5432/dbname
  ```

### Backup Strategy
- [ ] Automated backups enabled (Render does this)
- [ ] Manual backup tested
- [ ] Restore procedure documented
- [ ] Backup retention policy set (min 7 days)

---

## BACKEND DEPLOYMENT (Render)

### Web Service Setup
- [ ] GitHub repository connected to Render
- [ ] Root Directory set to `backend/`
- [ ] Environment set to Python 3
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`

### Environment Variables
- [ ] `DATABASE_URL` = production PostgreSQL URL
- [ ] `JWT_SECRET` = secure 32+ character string
- [ ] `ADMIN_USERNAME` = non-default username
- [ ] `ADMIN_PASSWORD` = strong secure password
- [ ] `ALLOWED_ORIGINS` = includes frontend production domain(s)
- [ ] `ENVIRONMENT` = `production`
- [ ] `DEBUG` = `false`

### Testing
- [ ] Backend builds successfully
- [ ] No errors in deployment logs
- [ ] Health check endpoint responds: GET `/`
- [ ] API docs accessible: GET `/docs`
- [ ] Authentication works: POST `/auth/login`
- [ ] Database operations work (create, read, update)
- [ ] CORS allows frontend requests
- [ ] All 31 endpoints tested

### Monitoring
- [ ] Logs accessible in Render dashboard
- [ ] Error tracking configured (optional: Sentry)
- [ ] Performance metrics visible
- [ ] Alerts setup for high memory/CPU
- [ ] Auto-deployment from GitHub enabled

---

## FRONTEND DEPLOYMENT (Vercel)

### Project Setup
- [ ] GitHub repository imported to Vercel
- [ ] Framework: Next.js
- [ ] Root Directory: `frontend/`
- [ ] Build Command: `next build`
- [ ] Output Directory: `.next`

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = production backend URL (from Render)
- [ ] `NEXT_PUBLIC_APP_URL` = production frontend URL (from Vercel)

### Testing
- [ ] Frontend builds successfully
- [ ] No build errors in logs
- [ ] Homepage loads
- [ ] All components render correctly
- [ ] Contact form works end-to-end
- [ ] API calls reach backend successfully
- [ ] No "failed to fetch" errors
- [ ] Mobile responsive on:
  - [ ] iPhone (375px)
  - [ ] iPad (768px)
  - [ ] Desktop (1920px)

### Performance
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] No network errors
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Monitoring
- [ ] Analytics enabled
- [ ] Web Vitals tracking
- [ ] Error tracking configured (optional: Sentry)
- [ ] Preview deployments working

---

## DOMAIN SETUP (Optional)

### Render (Backend)
- [ ] Custom domain: `api.yourdomain.com`
- [ ] DNS CNAME record added
- [ ] SSL certificate enabled
- [ ] Domain verified and working

### Vercel (Frontend)
- [ ] Custom domain: `yourdomain.com`
- [ ] DNS records configured (CNAME or A record)
- [ ] SSL certificate enabled (auto)
- [ ] Domain verified and working
- [ ] www subdomain redirects to main domain

---

## SECURITY HARDENING

### Backend
- [ ] CORS origins restricted to frontend domain(s)
- [ ] JWT secret is production-grade (32+ chars)
- [ ] Database password is strong and unique
- [ ] Admin credentials changed from defaults
- [ ] No debug mode enabled
- [ ] HTTPS enforced (automatic on both platforms)
- [ ] Rate limiting considered (optional)

### Frontend
- [ ] No sensitive data in localStorage
- [ ] API calls use HTTPS only
- [ ] Error messages don't expose sensitive info
- [ ] Forms have CSRF protection
- [ ] Input validation on all forms
- [ ] No API keys exposed in code

### Both
- [ ] Security headers configured
- [ ] HTTPS redirects enabled
- [ ] Regular updates planned
- [ ] Incident response plan documented

---

## MONITORING & MAINTENANCE

### Logging
- [ ] Backend logs accessible: Render Dashboard → Logs
- [ ] Frontend logs accessible: Vercel Dashboard → Deployments
- [ ] Error tracking enabled (Sentry recommended)
- [ ] Log retention policy set

### Backups
- [ ] Database backups automated (Render: daily)
- [ ] Backup restoration tested
- [ ] Code backups via GitHub
- [ ] Manual backup procedure documented

### Updates
- [ ] Security update policy established
- [ ] Dependency update process planned
- [ ] Testing protocol for updates defined
- [ ] Rollback plan documented

### Performance
- [ ] Monitoring dashboard set up
- [ ] Alerts configured for:
  - [ ] High memory usage (> 500MB)
  - [ ] High CPU usage (> 80%)
  - [ ] Slow response times (> 2s)
  - [ ] Error rate (> 1%)
  - [ ] Database connections (> 80%)

---

## COMMUNICATION

### Team
- [ ] Team notified of go-live date
- [ ] Deployment window scheduled
- [ ] Rollback plan communicated
- [ ] Support contacts listed

### Users
- [ ] Launch announcement ready
- [ ] User documentation prepared
- [ ] Support email/contact info provided
- [ ] Feedback mechanism setup

---

## GO-LIVE PROCEDURE

### Day Before
- [ ] Final code review completed
- [ ] All systems tested locally
- [ ] Backup current production (N/A for initial launch)
- [ ] Team on standby

### Deployment Day
1. [ ] Final tests of local environment
2. [ ] Push code to GitHub main branch
3. [ ] Monitor Render backend deployment
   - [ ] Logs show no errors
   - [ ] Health check passes
4. [ ] Monitor Vercel frontend deployment
   - [ ] Build succeeds
   - [ ] App accessible at URL
5. [ ] End-to-end testing:
   - [ ] Homepage loads
   - [ ] Contact form works
   - [ ] Admin login works
   - [ ] Database operations work
6. [ ] Performance check:
   - [ ] Page load < 3 seconds
   - [ ] No errors in console
7. [ ] Announce go-live to users
8. [ ] Monitor logs for errors

### After Go-Live
- [ ] Monitor error logs for 24 hours
- [ ] Check performance metrics
- [ ] Verify backups running
- [ ] Respond to user feedback
- [ ] Document any issues
- [ ] Plan for future improvements

---

## ROLLBACK PLAN (If Needed)

If something goes wrong:

### Option 1: Quick Rollback (< 5 minutes)
1. Render: Redeploy previous commit
   - Dashboard → Deployments
   - Find previous working version
   - Click → Promote to Production
2. Vercel: Rollback to previous deployment
   - Dashboard → Deployments
   - Select previous deployment
   - Click → Promote to Production
3. Verify health endpoints respond
4. Test end-to-end

### Option 2: Full Rollback (< 30 minutes)
1. Keep previous versions running
2. Switch DNS to point to old version (if using custom domains)
3. Fix issue in code
4. Redeploy with fix

### Option 3: Emergency Patch
1. If bug discovered post-deployment
2. Fix in code locally
3. Test thoroughly
4. Push to GitHub (creates new deployment)
5. Test new version
6. Promote to production

---

## POST-LAUNCH TASKS

### Week 1
- [ ] Monitor error logs daily
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Fix any reported issues
- [ ] Update documentation based on feedback

### Month 1
- [ ] Analyze usage patterns
- [ ] Optimize slow endpoints
- [ ] Plan infrastructure upgrades if needed
- [ ] Review security logs
- [ ] Update dependencies

### Ongoing
- [ ] Regular backups verified
- [ ] Security updates applied
- [ ] Performance optimization
- [ ] User support and feature requests
- [ ] Documentation updates

---

## Sign-Off

```
Completed by: _______________________
Date: _______________________
Backend URL: _______________________
Frontend URL: _______________________
Database: _______________________
```

---

## Important Contacts

```
Render Support: https://render.com/support
Vercel Support: https://vercel.com/support
FastAPI Issues: https://github.com/tiangolo/fastapi/issues
Next.js Issues: https://github.com/vercel/next.js/issues
```

---

**Status**: Ready for Production Deployment ✅
