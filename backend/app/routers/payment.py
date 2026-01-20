
from fastapi import APIRouter
router = APIRouter(prefix="/payment")

@router.post("/khalti")
def khalti(data: dict):
    return {"status":"khalti payment received"}

@router.post("/esewa")
def esewa(data: dict):
    return {"status":"esewa payment received"}
