
from fastapi import APIRouter
router = APIRouter(prefix="/ai")

@router.post("/chat")
def chat(data: dict):
    return {"reply": "AI Response to: " + data.get("message","")}
