
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from .routers import auth, blog, payment, ai, contact, dashboard

app = FastAPI(
    title="Himalayan AI Tech Pro API",
    description="Production-ready API for custom AI applications and business automation",
    version="1.0.0"
)

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:10000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
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
    return {
        "status": "🚀 Himalayan AI Tech Pro Backend Running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "himalayan-ai-backend"
    }
