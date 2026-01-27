"""
Dashboard Router
Provides aggregated statistics and analytics for admin dashboard
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from .auth import verify_token
from ..database.connection import get_db
from ..database.models import Contact, BlogPost, Payment, ChatSession

router = APIRouter(prefix="/dashboard")


@router.get("/stats")
def get_dashboard_stats(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Get dashboard statistics (admin only)"""
    
    # Count contacts
    total_contacts = db.query(Contact).count()
    
    # Count blogs
    total_blogs = db.query(BlogPost).count()
    featured_blogs = db.query(BlogPost).filter(BlogPost.featured == True).count()
    
    # Get payment stats
    completed_payments = db.query(Payment).filter(Payment.status == "completed").all()
    completed_count = len(completed_payments)
    total_revenue = sum(p.amount for p in completed_payments)
    
    # Get recent contacts
    recent_contacts = db.query(Contact).order_by(Contact.created_at.desc()).limit(5).all()
    
    return {
        "total_contacts": total_contacts,
        "total_blogs": total_blogs,
        "featured_blogs": featured_blogs,
        "total_payments": completed_count,
        "total_revenue": total_revenue,
        "pending_payments": db.query(Payment).filter(Payment.status == "pending").count(),
        "recent_messages": [
            {
                "id": c.id,
                "name": c.name,
                "email": c.email,
                "created_at": c.created_at.isoformat()
            }
            for c in recent_contacts
        ]
    }


@router.get("/overview")
def get_overview(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Get quick overview of all business metrics"""
    
    # Contact stats
    total_contacts = db.query(Contact).count()
    contacts_this_month = db.query(Contact).filter(
        Contact.created_at >= datetime.utcnow() - timedelta(days=30)
    ).count()
    
    # Blog stats
    published_blogs = db.query(BlogPost).filter(BlogPost.featured == True).count()
    
    # Payment stats
    completed_payments = db.query(Payment).filter(Payment.status == "completed").all()
    total_revenue = sum(p.amount for p in completed_payments)
    payments_this_month = db.query(Payment).filter(
        Payment.status == "completed",
        Payment.created_at >= datetime.utcnow() - timedelta(days=30)
    ).count()
    
    # Chat stats
    total_chats = db.query(ChatSession).count()
    chats_this_month = db.query(ChatSession).filter(
        ChatSession.created_at >= datetime.utcnow() - timedelta(days=30)
    ).count()
    
    return {
        "status": "success",
        "contacts": {
            "total": total_contacts,
            "this_month": contacts_this_month
        },
        "content": {
            "published_blogs": published_blogs,
            "total_blogs": db.query(BlogPost).count()
        },
        "payments": {
            "total_revenue": total_revenue,
            "transactions": len(completed_payments),
            "this_month": payments_this_month
        },
        "engagement": {
            "total_chats": total_chats,
            "chats_this_month": chats_this_month
        },
        "last_updated": datetime.utcnow().isoformat()
    }


@router.get("/recent")
def get_recent_activity(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Get recent activity across all modules"""
    
    recent_contacts = db.query(Contact).order_by(Contact.created_at.desc()).limit(5).all()
    recent_payments = db.query(Payment).order_by(Payment.created_at.desc()).limit(5).all()
    recent_chats = db.query(ChatSession).order_by(ChatSession.created_at.desc()).limit(5).all()
    
    return {
        "contacts": [
            {
                "type": "contact",
                "name": c.name,
                "email": c.email,
                "created_at": c.created_at.isoformat()
            }
            for c in recent_contacts
        ],
        "payments": [
            {
                "type": "payment",
                "customer": p.customer_name,
                "amount": p.amount,
                "status": p.status,
                "created_at": p.created_at.isoformat()
            }
            for p in recent_payments
        ],
        "chats": [
            {
                "type": "chat",
                "message_preview": c.user_message[:50],
                "created_at": c.created_at.isoformat()
            }
            for c in recent_chats
        ]
    }
