from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# Auth Models
class AdminLogin(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)

class AdminToken(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

# Blog Models
class BlogCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    content: str = Field(..., min_length=20)
    slug: Optional[str] = None
    featured: bool = False

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    featured: Optional[bool] = None

class Blog(BaseModel):
    id: str
    title: str
    content: str
    slug: str
    featured: bool
    created_at: datetime
    updated_at: datetime
    author: str

# Contact Models (enhanced)
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    project: str = Field(..., min_length=10, max_length=5000)
    phone: Optional[str] = None
    budget: Optional[str] = None

class ContactResponse(BaseModel):
    status: str
    message: str
    id: str
    created_at: datetime

# Payment Models
class KhaltiPayment(BaseModel):
    amount: int = Field(..., gt=0)
    customer_name: str
    customer_email: EmailStr
    description: str
    return_url: str

class PaymentResponse(BaseModel):
    status: str
    transaction_id: Optional[str] = None
    message: str
    payment_url: Optional[str] = None

# AI Chat Models
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    session_id: str
    timestamp: datetime

# Stats Models (for dashboard)
class Stats(BaseModel):
    total_contacts: int
    total_projects: int
    total_blog_posts: int
    total_payments: int
