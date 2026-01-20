
from fastapi import APIRouter
router = APIRouter(prefix="/contact")

messages = []

@router.post("/")
def save(data: dict):
    messages.append(data)
    return {"status":"saved"}
