# Environment Variables - Production Configuration

## Backend Environment (.env for Render)

```env
# ==========================================
# DATABASE CONFIGURATION
# ==========================================
# PostgreSQL connection string
# Format: postgresql://username:password@host:port/database
DATABASE_URL=postgresql://user:password@host.onrender.com:5432/himalayan_db

# ==========================================
# SECURITY & AUTHENTICATION
# ==========================================
# JWT Secret - Generate with: python -c "import secrets; print(secrets.token_urlsafe(32))"
# MUST be at least 32 characters for production
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Admin credentials for initial login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password-minimum-8-chars

# ==========================================
# CORS CONFIGURATION
# ==========================================
# Comma-separated list of allowed origins
# Include both www and non-www versions
ALLOWED_ORIGINS=https://app.example.com,https://www.app.example.com,https://your-frontend.vercel.app

# ==========================================
# APPLICATION SETTINGS
# ==========================================
# Environment: production, staging, development
ENVIRONMENT=production

# Debug mode (false for production)
DEBUG=false

# Server port
PORT=10000

# ==========================================
# OPTIONAL: MONITORING & LOGGING
# ==========================================
# Sentry error tracking (optional)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Logging level: DEBUG, INFO, WARNING, ERROR, CRITICAL
LOG_LEVEL=INFO
```

## Frontend Environment (.env.local for Vercel)

```env
# ==========================================
# API CONFIGURATION
# ==========================================
# Backend API URL (must match deployed backend)
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com

# Frontend application URL
NEXT_PUBLIC_APP_URL=https://your-frontend-name.vercel.app

# ==========================================
# OPTIONAL: ANALYTICS & MONITORING
# ==========================================
# Google Analytics ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry for frontend error tracking
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Local Development Environment (.env.local for local testing)

```env
# ==========================================
# LOCAL DATABASE
# ==========================================
# SQLite for development (auto-created)
DATABASE_URL=sqlite:///./test.db

# ==========================================
# LOCAL SECURITY (NOT FOR PRODUCTION)
# ==========================================
JWT_SECRET=development-secret-key-not-secure
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# ==========================================
# LOCAL CORS
# ==========================================
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002,http://127.0.0.1:3000,http://127.0.0.1:3001,http://127.0.0.1:3002

# ==========================================
# LOCAL SETTINGS
# ==========================================
ENVIRONMENT=development
DEBUG=true
PORT=10000
```

---

## How to Set These Up

### On Render (Backend)

1. Go to Render Dashboard → Your Web Service
2. Settings → Environment
3. Add each variable with its production value
4. Redeploy service after adding variables

### On Vercel (Frontend)

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add each variable
4. Redeploy after adding variables

### Locally (Development)

1. Create `backend/.env` with local database settings
2. Create `frontend/.env.local` with localhost API URL
3. Reload dev server to pick up changes

---

## Security Best Practices

✅ **Never commit .env files to git**
✅ **Use environment-specific secrets** (different JWT_SECRET for prod vs dev)
✅ **Rotate JWT_SECRET** regularly
✅ **Use strong passwords** (min 8 chars, mix of numbers/symbols)
✅ **Restrict CORS origins** to only your domains
✅ **Use HTTPS URLs** in production
✅ **Store secrets in platform's env var system**, not in code
✅ **Regularly audit** environment variables for sensitive data

---

## Generating Secure Values

### Generate JWT Secret (Python)
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
# Output: SomeRandomSecureStringHere_that_is_32_chars_long
```

### Generate Random Password
```bash
python -c "import secrets; print(secrets.token_hex(16))"
# Output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Testing Environment Variables

### Backend (Python)
```python
import os

db_url = os.getenv("DATABASE_URL")
jwt_secret = os.getenv("JWT_SECRET")
admin_user = os.getenv("ADMIN_USERNAME")

print(f"Database: {db_url}")
print(f"JWT Secret loaded: {'Yes' if jwt_secret else 'No'}")
print(f"Admin user: {admin_user}")
```

### Frontend (TypeScript)
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const appUrl = process.env.NEXT_PUBLIC_APP_URL

console.log(`API: ${apiUrl}`)
console.log(`App: ${appUrl}`)
```

---

## Troubleshooting

**Issue**: "DATABASE_URL is not set"
**Fix**: Make sure it's added in Render Environment Variables and service is redeployed

**Issue**: "Failed to fetch from API"
**Fix**: Check `NEXT_PUBLIC_API_URL` matches backend URL and CORS origins include frontend domain

**Issue**: "JWT token verification failed"
**Fix**: Ensure `JWT_SECRET` is the same across all instances (re-generate and update everywhere)

**Issue**: Environment variables showing as undefined
**Fix**: Variables must start with `NEXT_PUBLIC_` to be accessible in frontend browser code

---

## Environment Variable Checklist

### Before Going Live

- [ ] `DATABASE_URL` is production PostgreSQL, not local SQLite
- [ ] `JWT_SECRET` is a secure random string (32+ chars)
- [ ] `ADMIN_PASSWORD` is changed from default
- [ ] `ALLOWED_ORIGINS` includes your production domain(s)
- [ ] `NEXT_PUBLIC_API_URL` points to production backend
- [ ] `DEBUG` is set to `false`
- [ ] No sensitive data in .gitignore files
- [ ] Verified all variables load correctly
- [ ] Redeploy after any environment variable changes
