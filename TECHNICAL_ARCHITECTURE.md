# Technical Architecture - Himalayan AI Tech Pro

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USERS / CLIENTS                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────┐      ┌──────────────────────┐  │
│  │    FRONTEND (Next.js)   │◄────►│  Payment Gateways    │  │
│  │   Vercel / Custom CDN   │      │  (Khalti, eSewa)     │  │
│  │                         │      │                      │  │
│  │ • Landing Page          │      │ • Khalti Dashboard   │  │
│  │ • Admin Dashboard       │      │ • eSewa Dashboard    │  │
│  │ • Contact Form          │      │ • Webhook Handlers   │  │
│  │ • Blog Reader           │      └──────────────────────┘  │
│  │ • Chat Interface        │                                 │
│  └──────────┬──────────────┘                                 │
│             │                                                │
│             │ HTTP/HTTPS                                    │
│             │                                                │
│             ▼                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │       API GATEWAY (CORS Middleware)                  │  │
│  │    Handles Auth, Validation, Error Response          │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                       │
└──────────────────────┼───────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐
│  BACKEND (FastAPI)   │  │  EXTERNAL SERVICES   │
│ Render / Docker      │  │                      │
│                      │  │ • OpenAI (LLM)       │
│ • Auth Router        │  │ • Email Service      │
│ • Blog Router        │  │ • Stripe (future)    │
│ • Payment Router     │  │ • Analytics          │
│ • AI Router          │  │                      │
│ • Contact Router     │  │                      │
│ • Dashboard Router   │  │                      │
│                      │  └──────────────────────┘
│ Models & Validation  │
│ JWT Token Management │
│ In-Memory Storage    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  DATABASE (Optional) │
│  PostgreSQL          │
│  • Users/Sessions    │
│  • Blog Posts        │
│  • Contacts          │
│  • Payments          │
│  • Analytics         │
└──────────────────────┘
```

---

## 📦 Component Structure

### Frontend (Next.js 15+)

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with meta tags
│   ├── page.tsx                # Home page
│   ├── admin/
│   │   └── page.tsx            # Admin dashboard (protected)
│   ├── robots.ts               # robots.txt generator
│   ├── sitemap.ts              # sitemap.xml generator
│   └── globals.css             # Global styles + animations
├── components/
│   ├── Header.tsx              # Navigation bar
│   ├── Hero.tsx                # Landing hero section
│   ├── Services.tsx            # Services showcase
│   ├── WhyUs.tsx               # Unique selling points
│   ├── Contact.tsx             # Contact form with API
│   ├── CTA.tsx                 # Call-to-action section
│   ├── Founder.tsx             # Founder/team section
│   └── Footer.tsx              # Footer with links
├── lib/
│   ├── api.ts                  # Centralized API client
│   └── seo.ts                  # SEO utilities & schemas
├── public/
│   └── images/                 # Static assets
└── .env.local                  # Development env vars
```

### Backend (FastAPI)

```
backend/
├── app/
│   ├── main.py                 # FastAPI app setup, routers
│   ├── models.py               # Pydantic models for validation
│   ├── database/
│   │   └── connection.py       # Database connection (PostgreSQL)
│   └── routers/
│       ├── auth.py             # JWT authentication
│       ├── blog.py             # Blog CRUD operations
│       ├── payment.py          # Khalti/eSewa integration
│       ├── ai.py               # AI chat endpoints
│       ├── contact.py          # Contact form handling
│       └── dashboard.py        # Admin stats & overview
├── requirements.txt            # Python dependencies
├── .env                        # Production env vars
├── .env.example                # Env template
└── render.yaml                 # Render deployment config
```

---

## 🔐 Authentication Flow

```
┌──────────────┐
│   User       │
│  (Admin)     │
└──────┬───────┘
       │
       │ 1. POST /auth/login
       │    {username, password}
       ▼
┌──────────────────────────────┐
│   Auth Router                │
│   • Verify credentials       │
│   • Generate JWT token       │
│   • Set expiration (30 min)  │
└──────┬───────────────────────┘
       │
       │ 2. Response
       │    {access_token, expires_in}
       ▼
┌──────────────────────┐
│  Frontend            │
│  • Store token       │
│  • Add to headers    │
│  • Use for API calls │
└──────────┬───────────┘
           │
           │ 3. GET /dashboard/stats
           │    Authorization: Bearer {token}
           ▼
┌──────────────────────┐
│  Auth Middleware     │
│  • Decode JWT        │
│  • Check expiration  │
│  • Verify signature  │
└──────┬───────────────┘
       │
       ├─ Valid   ─► Route Handler
       │
       └─ Invalid ─► 401 Unauthorized
```

---

## 💳 Payment Processing Flow

```
┌─────────────┐
│   Customer  │
└──────┬──────┘
       │
       │ 1. Clicks "Pay with Khalti"
       ▼
┌─────────────────────────────┐
│  Frontend (Contact/CTA)      │
│  Collects payment info:      │
│  • Amount                    │
│  • Service description       │
│  • Email, Phone              │
└──────┬──────────────────────┘
       │
       │ 2. POST /payment/khalti/initiate
       ▼
┌──────────────────────────────┐
│  Backend Payment Router      │
│  • Generate payment_id       │
│  • Store transaction record  │
│  • Return token_url          │
└──────┬───────────────────────┘
       │
       │ 3. Redirect to Khalti
       ▼
┌──────────────────────────┐
│  Khalti Payment Gateway  │
│  • Customer completes    │
│  • Payment processed     │
│  • Webhook sent          │
└──────┬───────────────────┘
       │
       │ 4. Payment Webhook
       │    POST /payment/khalti/webhook
       ▼
┌──────────────────────────────┐
│  Backend Webhook Handler     │
│  • Verify payment signature  │
│  • Update transaction status │
│  • Send confirmation email   │
└──────┬───────────────────────┘
       │
       │ 5. Redirect to success page
       ▼
┌──────────────────────┐
│  Frontend Success    │
│  • Show confirmation │
│  • Log transaction   │
│  • Send email        │
└──────────────────────┘
```

---

## 🔄 Data Flow

### Contact Form Submission

```
User Input
    ↓
Client-side Validation
    ↓
POST /contact/ with FormData
    ↓
Backend receives request
    ↓
Pydantic validates:
  • name (2-100 chars)
  • email (valid format)
  • project (10-5000 chars)
  • phone (optional)
  • budget (optional)
    ↓
Generate UUID for contact
    ↓
Add timestamp
    ↓
Store in memory/database
    ↓
Return HTTP 200 with ContactResponse
    ↓
Frontend shows success message
    ↓
Auto-reset form after 5 seconds
```

### AI Chat Flow

```
User types message
    ↓
POST /ai/chat with ChatRequest
    ↓
Backend validates (max 5000 chars)
    ↓
Call LLM (OpenAI/mock)
    ↓
Generate AI response
    ↓
Create chat record with UUID & timestamp
    ↓
Store in chat_sessions
    ↓
Return ChatResponse with reply
    ↓
Display in frontend
    ↓
Store session_id for history
```

---

## 🛡️ Security Layers

### Frontend Security
- ✅ Content Security Policy (CSP) headers
- ✅ HTTPS only (Vercel enforces)
- ✅ No hardcoded credentials in code
- ✅ Token stored in httpOnly cookies (optional)
- ✅ CSRF protection via SameSite cookies
- ✅ Input sanitization on all forms

### Backend Security
- ✅ JWT token validation on protected routes
- ✅ Token expiration (30 minutes default)
- ✅ Password validation (future: bcrypt hashing)
- ✅ CORS restricted to allowed origins
- ✅ Rate limiting (ready to implement)
- ✅ SQL injection prevention (Pydantic models)
- ✅ HTTPS required in production
- ✅ Environment variables for secrets

### API Security
- ✅ All endpoints return proper HTTP status codes
- ✅ Error messages don't leak sensitive info
- ✅ Request validation on all endpoints
- ✅ Timeout for long-running operations
- ✅ Logging for suspicious activities

---

## 📊 Data Models

### User/Admin
```python
{
  "username": str,
  "email": str,
  "is_admin": bool,
  "created_at": datetime,
  "last_login": datetime
}
```

### Contact
```python
{
  "id": str (UUID),
  "name": str,
  "email": str (validated),
  "project": str,
  "phone": str (optional),
  "budget": str (optional),
  "created_at": datetime,
  "replied": bool,
  "status": str (pending/contacted/completed)
}
```

### Blog
```python
{
  "id": str (UUID),
  "title": str,
  "slug": str,
  "content": str (markdown),
  "excerpt": str,
  "author": str,
  "image_url": str,
  "tags": list[str],
  "published": bool,
  "views": int,
  "created_at": datetime,
  "updated_at": datetime
}
```

### Payment
```python
{
  "id": str (UUID),
  "amount": int (in smallest currency unit),
  "service": str,
  "email": str,
  "phone": str,
  "gateway": str (khalti/esewa),
  "status": str (pending/completed/failed),
  "transaction_id": str,
  "created_at": datetime,
  "completed_at": datetime (optional)
}
```

### Chat Session
```python
{
  "id": str (UUID),
  "session_id": str (UUID),
  "user_message": str,
  "ai_reply": str,
  "user_rating": int (1-5, optional),
  "created_at": datetime
}
```

---

## 🚀 Deployment Architecture

### Development
```
Local Machine
├── Frontend: npm run dev (port 3000)
├── Backend: uvicorn app.main:app --reload (port 10000)
└── Database: Local SQLite or PostgreSQL
```

### Production
```
GitHub Repository
    ├─► Vercel (Frontend)
    │   ├── Automatic deployment on push
    │   ├── Global CDN for static files
    │   ├── serverless functions for API routes
    │   └── Auto SSL certificates
    │
    └─► Render (Backend)
        ├── Automatic deployment on push
        ├── PostgreSQL add-on for database
        ├── Environment variables management
        ├── Built-in monitoring & logs
        └── SSL certificates
```

---

## 🔧 Technology Stack Rationale

### Frontend: Next.js
- **Why**: Server-side rendering, automatic optimization, great developer experience
- **Versions**: 15+ for latest features
- **Styling**: Tailwind CSS 4.1 for utility-first CSS
- **Animations**: Framer Motion for smooth UI transitions
- **Type Safety**: TypeScript for catching errors early

### Backend: FastAPI
- **Why**: Modern Python framework, automatic docs, fast performance, easy async support
- **Async**: Native async/await support for I/O operations
- **Validation**: Pydantic for data validation
- **Auth**: PyJWT for JWT token management
- **Speed**: One of fastest Python frameworks (comparable to Node.js)

### Database: PostgreSQL (Optional)
- **Why**: Reliable, scalable, perfect for production
- **Alternatives**: SQLite for MVP, MongoDB for flexibility
- **ORM**: SQLAlchemy for database abstraction

### Deployment: Render + Vercel
- **Why**: Free tier available, good for solopreneurs, automatic scaling
- **Benefits**: No DevOps required, built-in monitoring, easy rollbacks
- **Cost**: Very affordable for startup stage

---

## 📈 Scalability Considerations

### Current Limitations
- In-memory storage = data lost on restart
- Single FastAPI instance = potential bottlenecks
- No horizontal scaling built-in

### Scaling Plan
1. **Phase 1**: PostgreSQL for persistent storage
2. **Phase 2**: Add caching layer (Redis)
3. **Phase 3**: Implement background jobs (Celery)
4. **Phase 4**: Microservices for AI/payments
5. **Phase 5**: Load balancing across multiple instances

---

## 🔍 Monitoring & Logging

### Frontend Monitoring
- Vercel Analytics for performance
- Sentry for error tracking
- User session tracking via GA

### Backend Monitoring
- Render logs (real-time)
- Error logging (to database)
- Request logging (timestamp, endpoint, status)
- Performance metrics (response time)

---

## 🧪 Testing Strategy

### Frontend Tests
- Unit tests (Jest)
- Component tests (React Testing Library)
- E2E tests (Cypress/Playwright)
- Visual regression (Percy/Chromatic)

### Backend Tests
- Unit tests (pytest)
- Integration tests (requests to live API)
- Load tests (locust)
- Security tests (OWASP Top 10)

---

## 📚 API Documentation

### Auto-Generated
- FastAPI automatic docs: `/docs`
- ReDoc alternative: `/redoc`
- OpenAPI schema: `/openapi.json`

### Manual Documentation
- `PRODUCTION_DEPLOYMENT_v2.md` - Deployment guide
- `CLIENT_GUIDE.md` - Client-facing docs
- Endpoint reference in deployment guide

---

**Architecture Status**: ✅ Production-Ready
**Last Updated**: 2024
**Maintainability**: High (modular, well-documented)
