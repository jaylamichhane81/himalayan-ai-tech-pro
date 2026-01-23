
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from datetime import datetime, timedelta
import jwt
import os
from ..models import AdminLogin, AdminToken

router = APIRouter(prefix="/auth")

# Security configuration
SECRET_KEY = os.getenv("JWT_SECRET", "himalayan-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Hardcoded admin credentials (move to env vars in production)
ADMIN_CREDENTIALS = {
    "username": os.getenv("ADMIN_USERNAME", "admin"),
    "password": os.getenv("ADMIN_PASSWORD", "admin123"),
}

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Create JWT token with expiration"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthCredentials = Depends(security)):
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
def login(credentials: AdminLogin):
    """Admin login endpoint"""
    # Validate credentials
    if credentials.username != ADMIN_CREDENTIALS["username"] or \
       credentials.password != ADMIN_CREDENTIALS["password"]:
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
def verify(username: str = Depends(verify_token)):
    """Verify token and return user info"""
    return {"status": "authorized", "username": username}

@router.post("/logout")
def logout():
    """Logout endpoint (tokens are stateless, this is informational)"""
    return {"status": "logged out", "message": "Please discard the token"}
