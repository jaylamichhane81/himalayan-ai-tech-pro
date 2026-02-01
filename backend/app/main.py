"""
Himalayan AI Tech Pro - Main Application Entry Point
Production-ready FastAPI backend with SQLAlchemy ORM and comprehensive API endpoints
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import os
from contextlib import asynccontextmanager
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import rate limiting (optional for development)
try:
    from slowapi import Limiter
    from slowapi.util import get_remote_address
    from slowapi.errors import RateLimitExceeded
    RATE_LIMITING_AVAILABLE = True
except ImportError:
    RATE_LIMITING_AVAILABLE = False
    logger = None  # Will be set after logging config

from .routers import auth, blog, ai, contact, dashboard
from .database.connection import engine, Base

# Setup logging
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

# Initialize database tables
def init_db():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager"""
    # Startup: Initialize database
    init_db()
    print("✓ Database initialized")
    yield
    # Shutdown: Cleanup if needed
    print("✓ Application shutdown")


app = FastAPI(
    title="Himalayan AI Tech Pro API",
    description="Production-ready API for custom AI applications and business automation",
    version="1.0.0",
    lifespan=lifespan
)

# Security: Validate required environment variables in production
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
if ENVIRONMENT == "production":
    required_vars = ["DATABASE_URL", "JWT_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD"]
    missing = [var for var in required_vars if not os.getenv(var)]
    if missing:
        raise RuntimeError(f"Missing required env vars in production: {', '.join(missing)}")
    if os.getenv("JWT_SECRET") == "himalayan-secret-key-change-in-production":
        raise RuntimeError("JWT_SECRET still has default value - SECURITY RISK")

# CORS Configuration - Whitelist only trusted origins
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:3001,http://localhost:10000" if ENVIRONMENT == "development" else ""
).split(",")

# Remove empty strings and normalize
allowed_origins = [origin.strip() for origin in allowed_origins if origin.strip()]

if ENVIRONMENT == "production" and not allowed_origins:
    raise RuntimeError("ALLOWED_ORIGINS must be set in production")

if ENVIRONMENT == "production":
    # Strict CORS for production - no wildcard, no regex
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=allowed_origins
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        max_age=3600,
    )
else:
    # Permissive CORS for development
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Setup rate limiting (only if available)
if RATE_LIMITING_AVAILABLE:
    limiter = Limiter(key_func=get_remote_address)
    app.state.limiter = limiter

    @app.exception_handler(RateLimitExceeded)
    async def rate_limit_handler(request, exc):
        """Handle rate limit exceeded"""
        return {
            "status": "error",
            "message": "Too many requests. Please try again later.",
            "detail": str(exc.detail)
        }
else:
    logger.warning("slowapi not installed - rate limiting disabled")

# Include routers
app.include_router(auth.router)
app.include_router(blog.router)
# Payment router removed (Khalti & eSewa integrations disabled)
app.include_router(ai.router)
app.include_router(contact.router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    """Root endpoint - health check"""
    return {
        "status": "🚀 Himalayan AI Tech Pro Backend Running",
        "version": "1.0.0",
        "docs": "/docs",
        "environment": os.getenv("ENVIRONMENT", "development")
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "himalayan-ai-backend",
        "environment": os.getenv("ENVIRONMENT", "development")
    }
