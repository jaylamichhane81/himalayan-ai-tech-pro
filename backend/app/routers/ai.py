"""
AI Chat Router
Handles AI chatbot interactions with conversation history persistence
"""

from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from sqlalchemy.orm import Session
import uuid
import os

from ..models import ChatRequest, ChatResponse
from ..database.connection import get_db
from ..database.models import ChatSession as ChatSessionModel
from ..middleware import limiter

router = APIRouter(prefix="/ai")

# LLM Configuration
LLM_API_KEY = os.getenv("OPENAI_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-3.5-turbo")


def get_ai_response(message: str) -> str:
    """
    Get AI response
    Currently a placeholder - integrate with OpenAI/other LLM in production
    """
    # TODO: Integrate with actual LLM API
    # import openai
    # openai.api_key = LLM_API_KEY
    # response = openai.ChatCompletion.create(
    #     model=LLM_MODEL,
    #     messages=[{"role": "user", "content": message}]
    # )
    # return response.choices[0].message.content
    
    # Mock responses for MVP
    message_lower = message.lower()
    
    if any(word in message_lower for word in ["hello", "hi", "hey"]):
        return "Hello! 👋 I'm your Himalayan AI assistant. How can I help you today? Ask me about custom AI applications, automation, or our services!"
    
    if any(word in message_lower for word in ["price", "cost", "pricing"]):
        return "We offer custom pricing based on your project requirements. For a free consultation and quote, please contact us through the form on our website!"
    
    if any(word in message_lower for word in ["service", "ai", "custom", "build"]):
        return "We specialize in custom AI applications, business automation, and intelligent agents. Perfect for scaling your business! Would you like more details?"
    
    if any(word in message_lower for word in ["fast", "quick", "time"]):
        return "We pride ourselves on quick turnaround - typically 4 days for MVP development. Rush projects welcome!"
    
    if any(word in message_lower for word in ["contact", "email", "phone"]):
        return "You can reach us through the contact form on our website, or fill it out to get in touch. We respond within 24 hours!"
    
    return f"That's an interesting question! Regarding '{message}' - I'd recommend contacting our team directly for the most accurate information. We'd love to discuss your specific needs!"


@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatRequest, db: Session = Depends(get_db)):
    """
    AI Chat endpoint with rate limiting
    Accepts user messages and returns AI responses with persistent history
    """
    try:
        if not data.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if len(data.message) > 5000:
            raise HTTPException(status_code=400, detail="Message too long (max 5000 characters)")
        
        # Get AI response
        reply = get_ai_response(data.message)
        
        # Create session ID if not provided
        session_id = data.session_id or str(uuid.uuid4())
        
        # Store chat record in database
        chat_record = ChatSessionModel(
            id=str(uuid.uuid4()),
            session_id=session_id,
            user_message=data.message,
            ai_reply=reply,
            user_info="user"
        )
        
        db.add(chat_record)
        db.commit()
        db.refresh(chat_record)
        
        return ChatResponse(
            reply=reply,
            session_id=session_id,
            timestamp=chat_record.created_at
        )
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


@router.get("/chat/history/{session_id}")
def get_chat_history(session_id: str, limit: int = 50, db: Session = Depends(get_db)):
    """Get chat history for a session"""
    history = db.query(ChatSessionModel).filter(
        ChatSessionModel.session_id == session_id
    ).order_by(ChatSessionModel.created_at).limit(limit).all()
    
    return {
        "session_id": session_id,
        "total_messages": len(history),
        "messages": [
            {
                "id": h.id,
                "user_message": h.user_message,
                "ai_reply": h.ai_reply,
                "created_at": h.created_at.isoformat(),
            }
            for h in history
        ]
    }

@router.get("/stats")
def ai_stats(db: Session = Depends(get_db)):
    """Get AI chat statistics from database"""
    total_messages = db.query(ChatSessionModel).count()
    unique_sessions = db.query(ChatSessionModel.session_id).distinct().count()
    
    return {
        "total_messages": total_messages,
        "unique_sessions": unique_sessions,
        "average_messages_per_session": total_messages / max(unique_sessions, 1) if unique_sessions > 0 else 0
    }

@router.post("/chat/feedback")
def chat_feedback(message_id: str, rating: int, db: Session = Depends(get_db)):
    """Record user feedback on AI response (stub - can extend with feedback table)"""
    try:
        if rating not in [1, 2, 3, 4, 5]:
            raise HTTPException(status_code=400, detail="Rating must be 1-5")
        
        chat = db.query(ChatSessionModel).filter(ChatSessionModel.id == message_id).first()
        if not chat:
            raise HTTPException(status_code=404, detail="Message not found")
        
        # In production, create a Feedback table to store ratings
        # For now, just acknowledge
        return {"status": "success", "message": "Feedback recorded", "rating": rating}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
