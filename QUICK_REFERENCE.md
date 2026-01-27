# Quick Reference Guide

## 🚀 Quick Start

### Windows
```bash
# Just run the startup script
start-dev.bat
```

### macOS/Linux
```bash
# Make script executable
chmod +x start-dev.sh

# Run the startup script
./start-dev.sh
```

This will automatically:
- Create Python virtual environment
- Install dependencies
- Set up .env files with defaults
- Start backend on port 10000
- Start frontend on port 3000

## 📋 Common Commands

### Backend Commands
```bash
cd backend

# Activate environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate.bat # Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload

# Run tests (when available)
pytest

# Format code
black app/

# Type checking
mypy app/
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## 🔑 Environment Variables

### Backend (.env)
| Variable | Default | Required |
|----------|---------|----------|
| DATABASE_URL | sqlite:///./test.db | Yes |
| JWT_SECRET | himalayan-secret-key... | Yes (change in prod) |
| ADMIN_USERNAME | admin | Yes |
| ADMIN_PASSWORD | admin123 | Yes (change in prod) |
| ALLOWED_ORIGINS | localhost:3000,localhost:10000 | Yes |
| OPENAI_API_KEY | (empty) | Optional |
| KHALTI_SECRET_KEY | (empty) | Optional |
| ESEWA_MERCHANT_CODE | EPAYTEST | Optional |
| ENVIRONMENT | development | Yes |
| DEBUG | true | Yes (false in prod) |

### Frontend (.env.local)
| Variable | Default | Required |
|----------|---------|----------|
| NEXT_PUBLIC_API_URL | http://localhost:10000 | Yes |

## 📍 API Endpoints

### Health & Auth
```bash
GET  /health                    # Health check
POST /auth/login                # Login (returns JWT)
GET  /auth/verify               # Verify token (requires auth)
POST /auth/logout               # Logout
```

### Contact
```bash
POST /contact/                  # Submit contact form
GET  /contact/                  # Get all (requires auth)
```

### Blog
```bash
GET  /blog/                     # Get published posts
GET  /blog/{id}                 # Get single post
POST /blog/                     # Create (requires auth)
PUT  /blog/{id}                 # Update (requires auth)
DELETE /blog/{id}               # Delete (requires auth)
```

### AI Chat
```bash
POST /ai/chat                   # Send message
GET  /ai/chat/history/{id}      # Get chat history
```

### Payments
```bash
POST /payment/khalti/initiate   # Start Khalti payment
POST /payment/khalti/verify     # Verify Khalti
POST /payment/esewa/initiate    # Start eSewa payment
POST /payment/esewa/verify      # Verify eSewa
GET  /payment/history           # Payment history (requires auth)
GET  /payment/stats             # Payment stats (requires auth)
```

### Dashboard
```bash
GET /dashboard/stats            # Dashboard stats (requires auth)
GET /dashboard/overview         # Overview (requires auth)
GET /dashboard/recent           # Recent activity (requires auth)
```

## 🧪 Testing Endpoints

### Using curl

```bash
# Health check
curl http://localhost:10000/health

# Login
curl -X POST http://localhost:10000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Submit contact form
curl -X POST http://localhost:10000/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "project":"My AI project"
  }'

# Chat with AI
curl -X POST http://localhost:10000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'

# Get dashboard stats (with auth)
curl http://localhost:10000/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API documentation from: http://localhost:10000/docs
2. Use the Swagger UI to test all endpoints
3. Copy token from login response to Authorization header

## 📊 Database

### SQLite (Development)
- File: `backend/test.db`
- Auto-created on first run
- Deleted on server restart (all data lost)
- Perfect for local development

### PostgreSQL (Production)
```bash
# Connection string format:
postgresql://user:password@host:5432/database_name

# Example:
DATABASE_URL=postgresql://admin:password123@db.render.com:5432/himalayan_db
```

### Tables Created
- `blog_posts` - Blog articles
- `contacts` - Contact form submissions
- `chat_sessions` - Chat messages and history
- `payments` - Payment transactions

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 10000 (backend)
lsof -ti:10000 | xargs kill -9  # macOS/Linux

# On Windows, use Task Manager or:
netstat -ano | findstr :10000
taskkill /PID <PID> /F
```

### Database Errors
```bash
# Reset database
rm backend/test.db

# Or use PostgreSQL:
# psql -U admin -d himalayan_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

### CORS Errors
- Check `ALLOWED_ORIGINS` in `.env`
- Ensure frontend URL is included
- Example: `http://localhost:3000,http://localhost:10000`

### Auth Errors
- Verify JWT_SECRET matches between requests
- Check token expiration (30 min default)
- Tokens stored in localStorage
- Clear cache and re-login if needed

### API Not Responding
- Check if backend is running: http://localhost:10000/health
- Check network tab in browser DevTools
- Verify NEXT_PUBLIC_API_URL in frontend .env.local

## 📱 Mobile Testing

### Chrome DevTools
1. Open DevTools (F12)
2. Click device icon (Ctrl+Shift+M)
3. Select device or responsive mode
4. Test all components

### Physical Device
```bash
# Get your machine IP
ipconfig getifaddr en0  # macOS
ipconfig              # Windows

# Access from phone:
# http://YOUR_IP:3000
```

## 🔐 Security Tips

### Development
- Default credentials are fine for local testing
- SQLite is not suitable for production
- Debug mode is okay in development

### Production
- Change all default credentials
- Use strong JWT_SECRET (40+ characters, random)
- Use PostgreSQL with proper authentication
- Enable HTTPS
- Configure CORS properly
- Use environment variables for all secrets
- Set DEBUG=false
- Set ENVIRONMENT=production
- Enable backups
- Monitor error logs

## 📦 Deployment

### Backend (Render)
```bash
# Build Command:
pip install -r requirements.txt

# Start Command:
uvicorn app.main:app --host 0.0.0.0 --port 10000

# Set environment variables in Render dashboard
```

### Frontend (Vercel)
```bash
# Set environment variable:
NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# Automatic deployment on git push
```

## 📞 Support

### Debug Mode
Set `DEBUG=true` in backend .env to see detailed error messages

### API Documentation
http://localhost:10000/docs - Interactive Swagger UI

### Error Logs
- Backend: Check terminal output
- Frontend: Check browser console (F12)

### Performance
- Database: Check query performance with SQL_ECHO=true
- Frontend: Use Lighthouse in Chrome DevTools

---

**Last Updated**: January 2026
**Version**: 1.0.0
