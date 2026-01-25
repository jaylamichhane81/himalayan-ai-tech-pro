# Himalayan AI Tech Pro - Copilot Instructions

## Project Overview

**Himalayan AI Tech Pro** is a full-stack web application with a FastAPI backend and Next.js frontend. The backend serves as the core API handling authentication, AI chat, blog management, payments, and contact forms. The frontend is a React-based UI for accessing these services.

**Tech Stack:**
- **Backend**: FastAPI (Python) with SQLAlchemy ORM, PostgreSQL
- **Frontend**: Next.js 15+ (TypeScript/React) with Tailwind CSS 4.1, Framer Motion for animations  
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

### Frontend Structure (`frontend/app/` & `frontend/components/`)
Next.js 15+ app router (file-based routing):
- `layout.tsx` - Root layout; imports all page components
- `page.tsx` - Home landing page composed of reusable components (Header, Hero, Services, WhyUs, CTA, Contact, Founder, Footer)
- `components/` - Reusable React components (all using Tailwind CSS 4.1 and Framer Motion for animations)

## Key Conventions & Patterns

### Backend Patterns
1. **Router Convention**: All routers follow this structure:
   ```python
   from fastapi import APIRouter
   from .auth import verify_token  # For protected endpoints
   
   router = APIRouter(prefix="/endpoint")
   
   @router.post("/")
   def handler(data: PydanticModel):
       return {"status": "success", "data": result}
   ```
   - Define `router = APIRouter(prefix="/...")` at module top
   - **Use Pydantic models** for all request/response validation (defined in `models.py`)
   - Protected endpoints require `Depends(verify_token)` parameter
   - Return dicts; FastAPI auto-serializes to JSON
   - Errors use `HTTPException(status_code=401, detail="message")`

2. **In-Memory Storage**: `blog.py`, `contact.py`, `payment.py` use module-level lists (`blogs = []`, `messages = []`, `payment_history = []`)—**data is ephemeral** and lost on server restart

3. **Authentication**: 
   - JWT tokens with 30-minute expiration
   - Credentials from env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`
   - Protected endpoints use `verify_token` dependency to get username

4. **CORS**: Configured in `main.py` from `ALLOWED_ORIGINS` env var; defaults to `http://localhost:3000,http://localhost:10000`

### Frontend Patterns
1. **Page Structure**: `layout.tsx` is the root layout. Home is in `page.tsx`. All components live in `frontend/components/` (Next.js convention)
2. **Component Composition**: Pages import and compose components (e.g., `page.tsx` imports Header, Hero, Services, etc.). Components use Tailwind CSS 4.1 classes
3. **Animations**: Framer Motion library available (imported in package.json) for motion effects
4. **Styling**: Tailwind CSS 4.1 with `globals.css` and `tailwind.config.js`; some inline `style={{...}}` props
5. **API Calls**: Uses `process.env.NEXT_PUBLIC_API_URL` for backend base URL (set in `.env.local`)

## Important Files & Commands

### Backend Commands
- **Dev server**: `uvicorn app.main:app --reload` (from `backend/` directory; auto-reloads on changes)
- **Production**: `uvicorn app.main:app --host 0.0.0.0 --port 10000` (as configured in `render.yaml`)
- **Dependencies**: Install with `pip install -r requirements.txt` (includes FastAPI, uvicorn, SQLAlchemy, psycopg2-binary, pyjwt, python-dotenv)

### Frontend Commands
- Standard Next.js: `npm run dev`, `npm run build`, `npm run start`

## Integration Points

1. **Frontend → Backend**: 
   - Base URL from `process.env.NEXT_PUBLIC_API_URL` (e.g., `.env.local`)
   - Dev: `http://localhost:10000`; production: Render backend URL
   - `lib/api.ts` provides `ApiClient` class for centralized requests with error handling
   - All requests use `Content-Type: application/json`

2. **Authentication Flow**: 
   - Frontend calls `/auth/login` with `{"username": "admin", "password": "admin123"}`
   - Returns `{"access_token": "...", "token_type": "bearer", "expires_in": 1800}`
   - Protected endpoints use `Authorization: Bearer <token>` header (handled by `HTTPBearer()` in routers)

3. **Request/Response Contracts**: All payloads use Pydantic models (defined in `models.py`):
   - Requests validated by `@router.post()` parameter type hints
   - Responses automatically serialized from model instances
   - Invalid requests return 422 with field error details

4. **In-Memory State**: `dashboard.py` aggregates data from `blog`, `contact`, `payment` modules via shared list imports—changes across routers affect all stats queries

## Development Workflow

1. **Add new endpoint**:
   - Create router file in `backend/app/routers/` (e.g., `new_feature.py`)
   - Define `router = APIRouter(prefix="/feature")`
   - Import and include in `backend/app/main.py`: `app.include_router(new_feature.router)`

2. **Modify existing endpoint**: Edit corresponding file in `backend/app/routers/`; uvicorn auto-reloads

3. **Frontend changes**: Edit `frontend/app/` pages; dev server hot-reloads

4. **Database integration**: Use `SessionLocal` from `backend/app/database/connection.py` (currently unused)

## Critical Gotchas & Notes

- **Pydantic validation is active**: All router endpoints use Pydantic models from `models.py`. Missing required fields or type mismatches return 422 errors. Always check `models.py` when adding endpoints.
- **In-memory storage**: All data in module-level lists (`blogs`, `messages`, `payment_history`) is lost on server restart—**not suitable for production**. Implement database persistence before scaling.
- **Dashboard aggregation**: `dashboard.py` directly imports lists from other routers (e.g., `from .contact import messages`). Changes to data structures require updates across multiple files.
- **JWT token expiry**: Tokens expire after 30 minutes. Frontend must handle 401 responses and prompt re-authentication.
- **Environment variables**: 
  - `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` have defaults for dev but MUST be set in production
  - `ALLOWED_ORIGINS` defaults to `http://localhost:3000,http://localhost:10000`; update for production domains
- **PostgreSQL unused**: `database/connection.py` is a stub; current app uses only in-memory storage

## Quick Examples

**Adding a new protected endpoint**:
```python
# backend/app/routers/new_feature.py
from fastapi import APIRouter, Depends
from ..models import NewRequest, NewResponse
from .auth import verify_token

router = APIRouter(prefix="/feature")

@router.post("/action", response_model=NewResponse)
def do_action(req: NewRequest, username: str = Depends(verify_token)):
    # Only authenticated users can access
    return NewResponse(status="success", data=...)
```

Then in `backend/app/main.py`:
```python
from .routers import new_feature
app.include_router(new_feature.router)
```

**Adding validation model to `models.py`**:
```python
from pydantic import BaseModel, Field

class NewRequest(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    email: str  # Use EmailStr for emails

class NewResponse(BaseModel):
    status: str
    data: dict
```

**Frontend API call using ApiClient**:
```typescript
// frontend/lib/api.ts already has ApiClient configured
const client = new ApiClient()
const response = await client.post<ChatResponse>('/ai/chat', { message: 'Hello' })
```

## Data Flow Summary

- **User authenticates**: Frontend → POST `/auth/login` → Backend generates JWT
- **Protected operations**: Frontend includes `Authorization: Bearer <token>` → Backend validates with `verify_token`
- **State aggregation**: `dashboard.py` imports shared lists from `blog`, `contact`, `payment` modules → stats queries reflect live data
- **Persistence gap**: Currently all data ephemeral; database layer prepared but unused
