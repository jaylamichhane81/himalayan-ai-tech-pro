# Production Deployment Checklist

## Pre-Deployment Review

### Backend Configuration
- [ ] Database URL updated to production PostgreSQL (not SQLite)
- [ ] JWT_SECRET changed from default value
- [ ] ADMIN_USERNAME and ADMIN_PASSWORD are secure
- [ ] ALLOWED_ORIGINS includes only production domains
- [ ] ENVIRONMENT variable set to "production"
- [ ] DEBUG set to "false"
- [ ] All API keys configured (Khalti, eSewa, OpenAI if applicable)

### Frontend Configuration
- [ ] NEXT_PUBLIC_API_URL points to production backend URL
- [ ] Build tested locally with production environment
- [ ] No hardcoded localhost references
- [ ] SEO metadata updated

### Code Quality
- [ ] No console.log statements in production code
- [ ] No debugging code left
- [ ] All environment variables use process.env
- [ ] Error handling implemented throughout
- [ ] Input validation on all endpoints

### Database
- [ ] PostgreSQL server running and accessible
- [ ] Database created and migrations applied
- [ ] Backups configured
- [ ] Connection string verified

### Security
- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS properly configured
- [ ] SQL injection prevention (using SQLAlchemy ORM)
- [ ] XSS protection in place
- [ ] CSRF tokens if needed
- [ ] Rate limiting configured (if using Render)
- [ ] API keys stored securely (never in code)

### Testing
- [ ] Backend health check endpoint working
- [ ] All API endpoints tested
- [ ] Contact form submission working
- [ ] Payment flow tested in sandbox
- [ ] Authentication flow working
- [ ] Database persistence verified

### Monitoring
- [ ] Error logging configured
- [ ] Application monitoring set up
- [ ] Database monitoring set up
- [ ] Backup strategy in place

### Performance
- [ ] Frontend assets optimized
- [ ] Database queries optimized
- [ ] Caching configured
- [ ] CDN configured for static assets (optional)

## Deployment Steps

### 1. Backend Deployment (Render)
```bash
# 1. Ensure .env is in Render environment
# 2. Push to GitHub
# 3. Create Web Service on Render
#    - Build: pip install -r requirements.txt
#    - Start: uvicorn app.main:app --host 0.0.0.0 --port 10000
# 4. Add environment variables in Render dashboard
# 5. Deploy
```

### 2. Frontend Deployment (Vercel)
```bash
# 1. Push to GitHub
# 2. Connect Vercel to GitHub
# 3. Add environment variables:
#    - NEXT_PUBLIC_API_URL=<backend-url>
# 4. Deploy
```

### 3. Verify Deployment
- [ ] Backend health check: `https://backend-url/health`
- [ ] Frontend loads: `https://frontend-url`
- [ ] API documentation: `https://backend-url/docs`
- [ ] Contact form submits successfully
- [ ] Authentication works
- [ ] Data persists in database

## Post-Deployment

- [ ] Monitor error logs for issues
- [ ] Test all user workflows
- [ ] Set up automated backups
- [ ] Configure monitoring alerts
- [ ] Document any custom configurations
- [ ] Create runbooks for common issues

## Rollback Plan

If deployment fails:
1. Check error logs in Render/Vercel dashboards
2. Verify environment variables are correct
3. Check database connection
4. Rollback to previous version if needed
5. Contact support if stuck

## Maintenance

### Weekly
- [ ] Check error logs
- [ ] Verify backups completed

### Monthly
- [ ] Review performance metrics
- [ ] Update dependencies if security patches available
- [ ] Test disaster recovery plan

### Quarterly
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Capacity planning

---

**Last Updated**: January 2026
**Version**: 1.0.0
