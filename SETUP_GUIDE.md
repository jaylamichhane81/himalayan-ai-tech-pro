# Himalayan AI Tech Pro - Setup & Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Python 3.10+ (for backend)
- Node.js 18+ (for frontend)
- PostgreSQL 12+ (optional - uses SQLite for development by default)
- Git

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with defaults (for local development)
cat > .env << EOF
DATABASE_URL=sqlite:///./test.db
JWT_SECRET=himalayan-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:10000
ENVIRONMENT=development
DEBUG=true
EOF

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 10000
```

Backend will be available at: http://localhost:10000
API documentation: http://localhost:10000/docs

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:10000
EOF

# Run development server
npm run dev
```

Frontend will be available at: http://localhost:3000

## Production Deployment

### Environment Variables

Create `.env` file in backend directory with production values:

```bash
# Database (use PostgreSQL in production)
DATABASE_URL=postgresql://user:password@your-postgres-host:5432/himalayan_db

# JWT Security (change these!)
JWT_SECRET=your-very-secure-secret-key-here
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Payment Integration
KHALTI_PUBLIC_KEY=your-khalti-public-key
KHALTI_SECRET_KEY=your-khalti-secret-key
ESEWA_MERCHANT_CODE=your-esewa-merchant-code
ESEWA_MERCHANT_PASSWORD=your-esewa-password

# LLM Integration (optional)
OPENAI_API_KEY=your-openai-key
LLM_MODEL=gpt-3.5-turbo

# Environment
ENVIRONMENT=production
DEBUG=false
```

### Backend Deployment (on Render)

1. Push code to GitHub
2. Connect repository to Render
3. Create Web Service with:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
   - **Environment Variables**: Add all `.env` variables in Render dashboard

### Frontend Deployment (on Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set Environment Variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend-domain.com`
4. Deploy automatically

## API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token
- `GET /auth/verify` - Verify token (requires auth)
- `POST /auth/logout` - Logout

### Contact Form
- `POST /contact/` - Submit contact form
- `GET /contact/` - Get all contacts (requires auth)

### Blog
- `GET /blog/` - Get published blogs
- `GET /blog/{id}` - Get blog by ID
- `POST /blog/` - Create blog (requires auth)
- `PUT /blog/{id}` - Update blog (requires auth)
- `DELETE /blog/{id}` - Delete blog (requires auth)

### AI Chat
- `POST /ai/chat` - Send message to AI
- `GET /ai/chat/history/{session_id}` - Get chat history

### Payments
- `POST /payment/khalti/initiate` - Initiate Khalti payment
- `POST /payment/khalti/verify` - Verify Khalti payment
- `POST /payment/esewa/initiate` - Initiate eSewa payment
- `POST /payment/esewa/verify` - Verify eSewa payment

### Dashboard
- `GET /dashboard/stats` - Get stats (requires auth)
- `GET /dashboard/overview` - Get overview (requires auth)
- `GET /dashboard/recent` - Get recent activity (requires auth)

## Database Schema

### SQLite (Development)
Uses SQLite file-based database (`test.db`)

### PostgreSQL (Production)
```sql
-- Tables created automatically on startup:
-- - blog_posts
-- - contacts
-- - chat_sessions
-- - payments
```

## Troubleshooting

### CORS Issues
- Check `ALLOWED_ORIGINS` environment variable
- Ensure frontend URL is included in CORS configuration

### Database Connection Issues
- For PostgreSQL: Verify connection string format
- For SQLite: Ensure write permissions in project directory

### Auth Token Issues
- Tokens expire after 30 minutes
- Clear localStorage and re-login if needed

### API Errors
- Check browser console (frontend) and backend logs
- Review API documentation at `/docs` endpoint

## Development Commands

### Backend
```bash
# Run tests (when available)
pytest

# Format code
black app/

# Check types
mypy app/
```

### Frontend
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Support & Contact

For issues or questions:
- Email: support@himalayanatech.com
- Documentation: See inline code comments

---

**Last Updated**: January 2026
**Version**: 1.0.0
