
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt

router = APIRouter(prefix="/auth")
SECRET = "himalayan-secret-key"

class Login(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: Login):
    if data.username == "admin" and data.password == "admin123":
        token = jwt.encode({"user":"admin"}, SECRET, algorithm="HS256")
        return {"token": token}
    raise HTTPException(401, "Invalid credentials")
