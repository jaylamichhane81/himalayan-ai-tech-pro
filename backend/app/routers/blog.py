
from fastapi import APIRouter
router = APIRouter(prefix="/blog")

blogs = []

@router.get("/")
def get():
    return blogs

@router.post("/")
def add(data: dict):
    blogs.append(data)
    return {"message": "Blog saved"}
