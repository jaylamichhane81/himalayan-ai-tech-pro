
from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid
from ..models import Blog, BlogCreate, BlogUpdate

router = APIRouter(prefix="/blog")

# In-memory blog storage (use database in production)
blogs = []

@router.get("/", response_model=list[Blog])
def get_all_blogs(skip: int = 0, limit: int = 10):
    """Get all published blogs"""
    published = [b for b in blogs if b.get("published")]
    return published[skip:skip+limit]

@router.get("/{blog_id}", response_model=Blog)
def get_blog(blog_id: str):
    """Get single blog by ID"""
    blog = next((b for b in blogs if b.get("id") == blog_id), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@router.post("/", response_model=Blog)
def create_blog(blog_data: BlogCreate):
    """Create new blog (admin only)"""
    try:
        blog = {
            "id": str(uuid.uuid4()),
            "title": blog_data.title,
            "slug": blog_data.title.lower().replace(" ", "-"),
            "content": blog_data.content,
            "excerpt": blog_data.excerpt or blog_data.content[:200],
            "author": blog_data.author,
            "image_url": blog_data.image_url,
            "tags": blog_data.tags or [],
            "published": False,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "views": 0
        }
        blogs.append(blog)
        return blog
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{blog_id}", response_model=Blog)
def update_blog(blog_id: str, blog_data: BlogUpdate):
    """Update blog (admin only)"""
    blog = next((b for b in blogs if b.get("id") == blog_id), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    try:
        update_data = blog_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            if value is not None:
                blog[key] = value
        
        blog["updated_at"] = datetime.utcnow().isoformat()
        return blog
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{blog_id}/publish", response_model=Blog)
def publish_blog(blog_id: str):
    """Publish blog"""
    blog = next((b for b in blogs if b.get("id") == blog_id), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blog["published"] = True
    blog["updated_at"] = datetime.utcnow().isoformat()
    return blog

@router.delete("/{blog_id}")
def delete_blog(blog_id: str):
    """Delete blog"""
    blog = next((b for b in blogs if b.get("id") == blog_id), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blogs.remove(blog)
    return {"status": "success", "message": "Blog deleted"}

@router.get("/stats/all")
def blog_stats():
    """Get blog statistics"""
    return {
        "total_blogs": len(blogs),
        "published": len([b for b in blogs if b.get("published")]),
        "draft": len([b for b in blogs if not b.get("published")]),
        "total_views": sum(b.get("views", 0) for b in blogs)
    }
