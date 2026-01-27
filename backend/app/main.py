"""
Himalayan AI Tech Pro - Main Application Entry Point
Production-ready FastAPI backend with SQLAlchemy ORM and comprehensive API endpoints
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from contextlib import asynccontextmanager

from .routers import auth, blog, payment, ai, contact, dashboard
from .database.connection import engine, Base

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

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001,http://localhost:10000,http://127.0.0.1:3000,http://127.0.0.1:3001").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origin_regex="http?://.*:.*"
)

# Include routers
app.include_router(auth.router)
app.include_router(blog.router)
app.include_router(payment.router)
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
