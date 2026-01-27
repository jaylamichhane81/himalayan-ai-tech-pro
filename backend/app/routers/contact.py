"""
Contact Form Router
Handles contact form submissions with database persistence
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from sqlalchemy.orm import Session
import uuid

from ..models import ContactRequest, ContactResponse
from ..database.connection import get_db
from ..database.models import Contact as ContactModel

router = APIRouter(prefix="/contact")


@router.post("/", response_model=ContactResponse)
def save_contact(data: ContactRequest, db: Session = Depends(get_db)):
    """Save contact form submission to database"""
    contact_id = str(uuid.uuid4())
    
    # Create database record
    db_contact = ContactModel(
        id=contact_id,
        name=data.name,
        email=data.email,
        project=data.project,
        phone=data.phone,
        budget=data.budget,
    )
    
    try:
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        
        return ContactResponse(
            status="success",
            message=f"Thank you {data.name}! We'll review your project and connect within 24 hours.",
            id=contact_id,
            created_at=db_contact.created_at
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save contact: {str(e)}")


@router.get("/")
def get_contacts(db: Session = Depends(get_db)):
    """Get all contacts (admin endpoint - implement auth if needed)"""
    contacts = db.query(ContactModel).all()
    return {
        "total": len(contacts),
        "messages": [
            {
                "id": c.id,
                "name": c.name,
                "email": c.email,
                "project": c.project,
                "phone": c.phone,
                "budget": c.budget,
                "created_at": c.created_at.isoformat(),
            }
            for c in contacts
        ]
    }
