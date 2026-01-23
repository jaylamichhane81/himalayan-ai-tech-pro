
from fastapi import APIRouter, Depends
from .contact import messages
from .blog import blogs
from .payment import payment_history
from .auth import verify_token

router = APIRouter(prefix="/dashboard")

@router.get("/stats")
def get_dashboard_stats(username: str = Depends(verify_token)):
    """Get dashboard statistics (admin only)"""
    
    # Count contacts
    total_contacts = len(messages)
    
    # Count blogs
    published_blogs = len([b for b in blogs if b.get("published")])
    draft_blogs = len([b for b in blogs if not b.get("published")])
    
    # Get payment stats
    completed_payments = len([p for p in payment_history if p.get("status") == "completed"])
    total_revenue = sum(p.get("amount", 0) for p in payment_history if p.get("status") == "completed")
    
    return {
        "total_contacts": total_contacts,
        "total_blogs": published_blogs + draft_blogs,
        "published_blogs": published_blogs,
        "draft_blogs": draft_blogs,
        "total_payments": completed_payments,
        "total_revenue": total_revenue,
        "pending_payments": len([p for p in payment_history if p.get("status") == "pending"]),
        "recent_messages": messages[-5:] if messages else []
    }

@router.get("/overview")
def get_overview(username: str = Depends(verify_token)):
    """Get quick overview of all business metrics"""
    
    total_contacts = len(messages)
    unanswered = len([m for m in messages if not m.get("replied")])
    
    published_blogs = len([b for b in blogs if b.get("published")])
    total_views = sum(b.get("views", 0) for b in blogs)
    
    total_revenue = sum(p.get("amount", 0) for p in payment_history if p.get("status") == "completed")
    
    return {
        "status": "success",
        "contacts": {
            "total": total_contacts,
            "unanswered": unanswered
        },
        "content": {
            "published_blogs": published_blogs,
            "total_views": total_views
        },
        "payments": {
            "total_revenue": total_revenue,
            "transactions": len([p for p in payment_history if p.get("status") == "completed"])
        },
        "last_updated": "now"
    }
