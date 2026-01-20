
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, blog, payment, ai, contact

app = FastAPI(title="Himalayan AI Tech Pro API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(blog.router)
app.include_router(payment.router)
app.include_router(ai.router)
app.include_router(contact.router)

@app.get("/")
def home():
    return {"status": "Himalayan AI Tech Pro Backend Running"}
