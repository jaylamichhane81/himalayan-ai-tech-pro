# Himalayan AI Tech Pro - Copilot Instructions

## Project Overview

**Himalayan AI Tech Pro** is a full-stack web application with a FastAPI backend and Next.js frontend. The backend serves as the core API handling authentication, AI chat, blog management, payments, and contact forms. The frontend is a React-based UI for accessing these services.

**Tech Stack:**
- Backend: FastAPI (Python) with SQLAlchemy ORM, PostgreSQL
- Frontend: Next.js (TypeScript/React)  
- Deployment: Render (via `render.yaml`)
- Payments: Khalti and eSewa integration support

## Architecture Overview

### Backend Structure (`backend/app/`)
The backend uses FastAPI's modular router pattern. All routes are defined in `routers/` and included in `main.py`:

- **`main.py`**: Application entry point. Instantiates FastAPI app, configures CORS (allows all origins), and includes all routers. Serves `GET /` for health check.
- **Routers**: Each domain gets its own file in `backend/app/routers/`:
  - `auth.py` - JWT token generation (hardcoded: admin/admin123, SECRET="himalayan-secret-key")
  - `ai.py` - Chat endpoint: POST `/ai/chat` with `{"message": "..."}`, returns `{"reply": "..."}`
  - `blog.py` - In-memory blog list: GET `/blog/` retrieves, POST `/blog/` adds items
  - `payment.py` - POST `/payment/khalti` and `/payment/esewa` endpoints
  - `contact.py` - Contact form: POST `/contact/` saves messages in-memory
- **Database**: `database/connection.py` uses SQLAlchemy with PostgreSQL (connection string from `DATABASE_URL` env var)

### Frontend Structure (`frontend/app/`)
Next.js 13+ app router (file-based routing):
- `page.tsx` - Home page (landing)
- `ai-demos/page.tsx` - AI chat demo with "use client" directive
- `dashboard/page.tsx` - Admin dashboard

## Key Conventions & Patterns

### Backend Patterns
1. **Router Convention**: All routers follow this structure:
   ```python
   from fastapi import APIRouter
   router = APIRouter(prefix="/endpoint")
   
   @router.post("/")
   def handler(data: dict):
       return {"status": "message"}
   ```
   - Define `router = APIRouter(prefix="/...")` at module top
   - Use dict parameters for POST requests (no Pydantic validation yet)
   - Return dicts; FastAPI auto-serializes to JSON
   - Errors use `HTTPException(status_code, message)`

2. **In-Memory Storage**: `blog.py` and `contact.py` use module-level lists `blogs = []` and `messages = []`—data persists only during server runtime (MVP pattern)

3. **CORS**: Configured in `main.py` with `allow_origins=["*"]`; no per-endpoint configuration needed

### Frontend Patterns
1. **Page Structure**: Routes are directories containing `page.tsx` (Next.js convention)
2. **"use client"**: `ai-demos/page.tsx` uses `"use client"` directive for client-side interactivity (hooks)
3. **Styling**: Inline `style={{...}}` props; no CSS modules observed
4. **API Calls**: Uses `process.env.NEXT_PUBLIC_API_URL` for backend base URL (environment-dependent)

## Important Files & Commands

### Backend Commands
- **Dev server**: `uvicorn app.main:app --reload` (from `backend/` directory; auto-reloads on changes)
- **Production**: `uvicorn app.main:app --host 0.0.0.0 --port 10000` (as configured in `render.yaml`)
- **Dependencies**: Install with `pip install -r requirements.txt` (includes FastAPI, uvicorn, SQLAlchemy, psycopg2-binary, pyjwt, python-dotenv)

### Frontend Commands
- Standard Next.js: `npm run dev`, `npm run build`, `npm run start`

## Integration Points

1. **Frontend → Backend**: 
   - Base URL from `process.env.NEXT_PUBLIC_API_URL`
   - Example: `ai-demos/page.tsx` calls `{NEXT_PUBLIC_API_URL}/ai/chat` to send messages
   - Dev typically uses `http://localhost:10000`; production uses deployed URL

2. **Authentication**: 
   - POST to `/auth/login` with `{"username": "admin", "password": "admin123"}`
   - Returns `{"token": "<jwt_token>"}` (JWT encoded with SECRET key)

3. **AI Chat**: POST `/ai/chat` with `{"message": "..."}`, returns `{"reply": "..."`

4. **In-Memory Operations**: Blog and contact data is stored in-memory lists; implement database persistence when scaling

## Development Workflow

1. **Add new endpoint**:
   - Create router file in `backend/app/routers/` (e.g., `new_feature.py`)
   - Define `router = APIRouter(prefix="/feature")`
   - Import and include in `backend/app/main.py`: `app.include_router(new_feature.router)`

2. **Modify existing endpoint**: Edit corresponding file in `backend/app/routers/`; uvicorn auto-reloads

3. **Frontend changes**: Edit `frontend/app/` pages; dev server hot-reloads

4. **Database integration**: Use `SessionLocal` from `backend/app/database/connection.py` (currently unused)

## Critical Gotchas & Notes

- **Hardcoded credentials**: `admin/admin123` in `auth.py`—replace with env vars for production
- **Hardcoded JWT secret**: `SECRET = "himalayan-secret-key"` in `auth.py`—move to env var
- **In-memory storage**: All data in `blog.py` and `contact.py` is lost on server restart
- **PostgreSQL not configured**: `DATABASE_URL` in `database/connection.py` is a template; set via env for actual database connection
- **No validation**: Routers accept dict parameters without Pydantic validation (add BaseModel classes as needed)
