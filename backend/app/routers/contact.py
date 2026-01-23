
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from datetime import datetime
import uuid

router = APIRouter(prefix="/contact")

# In-memory storage (replace with database in production)
messages = []

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    project: str

class ContactResponse(BaseModel):
    status: str
    message: str
    id: str

@router.post("/", response_model=ContactResponse)
def save_contact(data: ContactRequest):
    """Save contact form submission"""
    contact_id = str(uuid.uuid4())
    
    # Add metadata
    contact = {
        "id": contact_id,
        "name": data.name,
        "email": data.email,
        "project": data.project,
        "created_at": datetime.utcnow().isoformat(),
    }
    
    messages.append(contact)
    
    return ContactResponse(
        status="success",
        message=f"Thank you {data.name}! We'll review your project and connect within 24 hours.",
        id=contact_id
    )

@router.get("/")
def get_contacts():
    """Get all contacts (admin endpoint)"""
    return {"total": len(messages), "messages": messages}
