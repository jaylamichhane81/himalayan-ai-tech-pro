# Troubleshooting Guide

## Common Issues & Solutions

### Backend Issues

#### Issue: "ModuleNotFoundError: No module named 'fastapi'"
**Cause**: Dependencies not installed  
**Solution**:
```bash
cd backend
pip install -r requirements.txt
```

#### Issue: "Address already in use" on port 10000
**Cause**: Another process is using the port  
**Solution** (Windows):
```bash
netstat -ano | findstr :10000
taskkill /PID <PID> /F
```
**Solution** (macOS/Linux):
```bash
lsof -ti:10000 | xargs kill -9
```

#### Issue: "sqlite3.OperationalError: database is locked"
**Cause**: Multiple processes accessing SQLite simultaneously  
**Solution**: 
- Use PostgreSQL for production
- Don't open database file in multiple programs
- Wait a few seconds and try again

#### Issue: "CORS error: Access-Control-Allow-Origin header missing"
**Cause**: Frontend URL not in ALLOWED_ORIGINS  
**Solution**: Update backend/.env
```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:10000
```

#### Issue: API returns 401 Unauthorized
**Cause**: Token missing or expired  
**Solution**:
- Clear browser localStorage: `localStorage.clear()`
- Login again to get new token
- Check token expiration (30 minutes)

#### Issue: "Connection refused" when connecting to database
**Cause**: PostgreSQL not running or wrong connection string  
**Solution**:
- For development: Use SQLite (default)
- For production: Start PostgreSQL service
- Verify DATABASE_URL format: `postgresql://user:pass@host:5432/db`

#### Issue: "JWT signature verification failed"
**Cause**: JWT_SECRET mismatch  
**Solution**:
- Ensure JWT_SECRET is same between token creation and verification
- Restart backend to load new environment variables

### Frontend Issues

#### Issue: "API call returns 404 Not Found"
**Cause**: Frontend using wrong API URL  
**Solution**: Check frontend/.env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:10000
```

#### Issue: "npm: command not found"
**Cause**: Node.js not installed  
**Solution**:
- Download from https://nodejs.org
- Install Node.js 18+
- Verify: `node --version`

#### Issue: "next: command not found"
**Cause**: Dependencies not installed  
**Solution**:
```bash
cd frontend
npm install
```

#### Issue: Port 3000 already in use
**Cause**: Another process using the port  
**Solution**:
```bash
# Run on different port
npm run dev -- -p 3001
```

#### Issue: Blank page or components not rendering
**Cause**: Build errors or missing dependencies  
**Solution**:
1. Check browser console (F12) for errors
2. Check terminal output for build errors
3. Run `npm install` again
4. Clear browser cache: `Ctrl+Shift+Delete`

#### Issue: Tailwind CSS not applied
**Cause**: PostCSS/Tailwind configuration missing  
**Solution**:
- Verify `tailwind.config.js` exists
- Verify `postcss.config.js` exists
- Verify `globals.css` has `@import "tailwindcss"`
- Restart dev server

### Integration Issues

#### Issue: Frontend can't reach backend
**Cause**: Backend not running or CORS misconfigured  
**Solution**:
1. Start backend: `uvicorn app.main:app --reload`
2. Test: http://localhost:10000/health
3. Check ALLOWED_ORIGINS in backend/.env
4. Check NEXT_PUBLIC_API_URL in frontend/.env.local

#### Issue: Contact form not submitting
**Cause**: API error or validation failure  
**Solution**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit form and check request/response
4. Look for validation errors in response
5. Check backend logs for detailed error

#### Issue: Database data not persisting
**Cause**: Using in-memory storage or SQLite file deleted  
**Solution**:
- Check DATABASE_URL is not `:memory:`
- Check test.db file exists in backend folder
- Stop/restart backend server
- For production, switch to PostgreSQL

### Environment & Configuration Issues

#### Issue: Environment variables not loading
**Cause**: .env file not in correct location  
**Solution**:
```bash
# Backend
# .env should be in backend/ directory
# Not backend/app/

# Frontend
# .env.local should be in frontend/ directory
# Not frontend/app/
```

#### Issue: "SECRET KEY not found" error
**Cause**: Environment variables not configured  
**Solution**:
1. Create `.env` in backend directory (from `.env.example`)
2. Fill in required values
3. Restart backend
4. Verify: `echo $DATABASE_URL` (Linux/Mac)

#### Issue: Wrong environment being used
**Cause**: ENVIRONMENT variable not set  
**Solution**:
```bash
# backend/.env
ENVIRONMENT=development  # or production
DEBUG=true              # false in production
```

### Database Issues

#### Issue: "Table not found" error
**Cause**: Database tables not created  
**Solution**:
- Restart backend (automatically creates tables)
- Or run: `python test_project.py`

#### Issue: "Column not found" error
**Cause**: Database schema mismatch  
**Solution**:
1. Delete test.db (SQLite only): `rm backend/test.db`
2. Restart backend to recreate tables
3. Or for PostgreSQL: Drop and recreate database

#### Issue: "Type error" on database insert
**Cause**: Data type mismatch  
**Solution**:
- Check Pydantic model in models.py
- Verify database model types in database/models.py
- Ensure input data matches expected types

### Performance Issues

#### Issue: API response slow
**Cause**: Unoptimized queries or large dataset  
**Solution**:
- Check database indexes (verify in models.py)
- Use pagination on list endpoints
- Consider adding caching (Redis)
- Profile with `SQL_ECHO=true` in .env

#### Issue: Frontend slow to load
**Cause**: Large bundle or many requests  
**Solution**:
- Run `npm run build` to check bundle size
- Use DevTools Network tab to identify slow requests
- Consider lazy loading components
- Enable compression (automatic on Vercel/Render)

### Security Issues

#### Issue: "API Key exposed in console"
**Cause**: Hardcoded secrets in code  
**Solution**:
- Move to environment variables
- Never commit .env file
- Use `.gitignore` to exclude .env files

#### Issue: "CORS allows all origins"
**Cause**: ALLOWED_ORIGINS set to "*"  
**Solution**:
```bash
# backend/.env
# WRONG:
ALLOWED_ORIGINS=*

# CORRECT:
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

#### Issue: "JWT token easily guessable"
**Cause**: JWT_SECRET too simple  
**Solution**:
```bash
# Generate strong random secret
openssl rand -hex 32
# Or use online generator: https://randomkeygen.com

# Update backend/.env
JWT_SECRET=<your-random-secret>
```

### Deployment Issues

#### Issue: "Render deployment fails"
**Cause**: Missing environment variables or build error  
**Solution**:
1. Check Render logs for specific error
2. Verify all env vars set in Render dashboard
3. Test locally first
4. Check requirements.txt format
5. Ensure start command is correct

#### Issue: "Vercel deployment fails"
**Cause**: Build error or missing environment  
**Solution**:
1. Check Vercel build logs
2. Test `npm run build` locally
3. Verify NEXT_PUBLIC_API_URL set
4. Check node version matches
5. Clear build cache and redeploy

#### Issue: "Blank page after deployment"
**Cause**: API URL pointing to localhost  
**Solution**:
- Update NEXT_PUBLIC_API_URL in Vercel env vars
- Must be actual domain, not localhost
- Restart deployment after update

---

## Debug Modes

### Enable Verbose Logging

**Backend**:
```bash
# backend/.env
DEBUG=true
SQL_ECHO=true  # Log all SQL queries
ENVIRONMENT=development
```

**Frontend**:
```typescript
// frontend/lib/api.ts
// Uncomment console logs for debugging
console.log('Request:', endpoint);
console.log('Response:', response);
```

### Browser DevTools

1. **Console Tab**: Check for JavaScript errors
2. **Network Tab**: Check API requests/responses
3. **Application Tab**: Check localStorage for token
4. **Elements Tab**: Inspect CSS/HTML issues

### Backend API Documentation

Visit http://localhost:10000/docs for interactive API testing

### Test Project Verification

Run anytime to verify all components:
```bash
python test_project.py
```

---

## Getting Help

### Check These First
1. Run `test_project.py` for system verification
2. Review error message carefully
3. Check appropriate section of this guide
4. Check official documentation
5. Review code comments

### If Still Stuck

1. **Check error message**: Usually tells you exactly what's wrong
2. **Check logs**: Look at terminal/console output
3. **Search online**: Most issues are common and documented
4. **Review code**: Carefully read error line number
5. **Test in isolation**: Create minimal test case

### Resources

- FastAPI: https://fastapi.tiangolo.com/
- Next.js: https://nextjs.org/
- Tailwind: https://tailwindcss.com/
- SQLAlchemy: https://docs.sqlalchemy.org/
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs

---

**Last Updated**: January 2026  
**Version**: 1.0.0

