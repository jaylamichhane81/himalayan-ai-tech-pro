"""
Authentication Router
Handles JWT token generation and verification with secure credential management
"""

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
import jwt
import os
from ..models import AdminLogin, AdminToken
from ..middleware import limiter

router = APIRouter(prefix="/auth")

# Security configuration from environment variables
# In production, these MUST be set via environment - no defaults for secrets
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

SECRET_KEY = os.getenv("JWT_SECRET")
if not SECRET_KEY:
    if ENVIRONMENT == "production":
        raise RuntimeError("JWT_SECRET environment variable is required in production")
    SECRET_KEY = "dev-secret-key-change-in-production"  # Dev only

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Admin credentials from environment variables - strict in production
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
if not ADMIN_USERNAME or not ADMIN_PASSWORD:
    if ENVIRONMENT == "production":
        raise RuntimeError("ADMIN_USERNAME and ADMIN_PASSWORD required in production")
    # Dev defaults
    ADMIN_USERNAME = "admin"
    ADMIN_PASSWORD = "admin123"

security = HTTPBearer()


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create JWT token with expiration"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Verify JWT token from Authorization header"""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/login", response_model=AdminToken)
def login(credentials: AdminLogin) -> AdminToken:
    """Admin login endpoint"""
    # Validate credentials
    if credentials.username != ADMIN_USERNAME or \
       credentials.password != ADMIN_PASSWORD:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": credentials.username},
        expires_delta=access_token_expires
    )
    
    return AdminToken(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )


@router.get("/verify")
def verify(username: str = Depends(verify_token)) -> dict:
    """Verify token and return user info"""
    return {"status": "authorized", "username": username}


@router.post("/logout")
def logout() -> dict:
    """Logout endpoint (tokens are stateless, this is informational)"""
    return {"status": "logged out", "message": "Please discard the token"}
