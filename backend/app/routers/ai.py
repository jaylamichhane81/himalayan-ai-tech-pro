
from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid
import os
from ..models import ChatRequest, ChatResponse

router = APIRouter(prefix="/ai")

# Chat history storage (use database in production)
chat_sessions = []

# LLM Configuration (placeholder for OpenAI/other LLM integration)
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
def chat(request: ChatRequest):
    """
    AI Chat endpoint
    Accepts user messages and returns AI responses
    """
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if len(request.message) > 5000:
            raise HTTPException(status_code=400, detail="Message too long (max 5000 characters)")
        
        # Get AI response
        reply = get_ai_response(request.message)
        
        # Create chat session record
        chat_record = {
            "id": str(uuid.uuid4()),
            "session_id": request.session_id or str(uuid.uuid4()),
            "user_message": request.message,
            "ai_reply": reply,
            "created_at": datetime.utcnow().isoformat(),
            "user_info": request.user_info or "anonymous"
        }
        
        chat_sessions.append(chat_record)
        
        return ChatResponse(
            status="success",
            message=request.message,
            reply=reply,
            session_id=chat_record["session_id"]
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@router.get("/chat/history/{session_id}")
def get_chat_history(session_id: str, limit: int = 50):
    """Get chat history for a session"""
    history = [c for c in chat_sessions if c.get("session_id") == session_id]
    return {
        "session_id": session_id,
        "total_messages": len(history),
        "messages": history[-limit:]
    }

@router.get("/stats")
def ai_stats():
    """Get AI chat statistics"""
    unique_sessions = len(set(c.get("session_id") for c in chat_sessions))
    return {
        "total_messages": len(chat_sessions),
        "unique_sessions": unique_sessions,
        "average_messages_per_session": len(chat_sessions) / max(unique_sessions, 1)
    }

@router.post("/chat/feedback")
def chat_feedback(session_id: str, message_id: str, rating: int):
    """Record user feedback on AI response"""
    try:
        if rating not in [1, 2, 3, 4, 5]:
            raise HTTPException(status_code=400, detail="Rating must be 1-5")
        
        chat = next((c for c in chat_sessions if c.get("id") == message_id), None)
        if not chat:
            raise HTTPException(status_code=404, detail="Message not found")
        
        chat["user_rating"] = rating
        chat["feedback_at"] = datetime.utcnow().isoformat()
        
        return {"status": "success", "message": "Feedback recorded"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
