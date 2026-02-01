"""
Custom middleware and utilities for production security
"""

try:
    from slowapi import Limiter
    from slowapi.util import get_remote_address
    limiter = Limiter(key_func=get_remote_address)
except ImportError:
    limiter = None

# Rate limiting presets (for reference in routers)
RATE_LIMITS = {
    "contact": "5/hour",        # Contact form: 5 per hour per IP
    "ai_chat": "30/hour",       # AI chat: 30 per hour per IP
    "payment": "10/hour",       # Payment: 10 per hour per IP
    "login": "10/15 minutes",   # Login attempts: 10 per 15 min per IP
    "api": "100/hour",          # General API: 100 per hour per IP
}
