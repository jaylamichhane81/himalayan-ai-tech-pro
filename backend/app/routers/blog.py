"""
Blog Router
Manages blog posts with database persistence
"""

from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from sqlalchemy.orm import Session
from typing import Optional
import uuid
import re

from ..models import Blog, BlogCreate, BlogUpdate
from ..database.connection import get_db
from ..database.models import BlogPost as BlogPostModel

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text

router = APIRouter(prefix="/blog")


@router.get("/", response_model=list[Blog])
def get_all_blogs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all published blogs"""
    posts = db.query(BlogPostModel).filter(BlogPostModel.featured == True).offset(skip).limit(limit).all()
    return [
        Blog(
            id=p.id,
            title=p.title,
            content=p.content,
            slug=p.slug,
            featured=p.featured,
            created_at=p.created_at,
            updated_at=p.updated_at,
            author=p.author
        )
        for p in posts
    ]


@router.get("/{blog_id}", response_model=Blog)
def get_blog(blog_id: str, db: Session = Depends(get_db)):
    """Get single blog by ID"""
    blog = db.query(BlogPostModel).filter(BlogPostModel.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return Blog(
        id=blog.id,
        title=blog.title,
        content=blog.content,
        slug=blog.slug,
        featured=blog.featured,
        created_at=blog.created_at,
        updated_at=blog.updated_at,
        author=blog.author
    )


@router.post("/", response_model=Blog)
def create_blog(blog_data: BlogCreate, db: Session = Depends(get_db)):
    """Create new blog post"""
    try:
        blog_id = str(uuid.uuid4())
        slug = blog_data.slug or slugify(blog_data.title)
        
        # Check if slug already exists
        existing = db.query(BlogPostModel).filter(BlogPostModel.slug == slug).first()
        if existing:
            raise HTTPException(status_code=400, detail="Slug already exists")
        
        db_blog = BlogPostModel(
            id=blog_id,
            title=blog_data.title,
            slug=slug,
            content=blog_data.content,
            featured=blog_data.featured,
            author="admin"
        )
        
        db.add(db_blog)
        db.commit()
        db.refresh(db_blog)
        
        return Blog(
            id=db_blog.id,
            title=db_blog.title,
            content=db_blog.content,
            slug=db_blog.slug,
            featured=db_blog.featured,
            created_at=db_blog.created_at,
            updated_at=db_blog.updated_at,
            author=db_blog.author
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to create blog: {str(e)}")


@router.put("/{blog_id}", response_model=Blog)
def update_blog(blog_id: str, blog_data: BlogUpdate, db: Session = Depends(get_db)):
    """Update blog post"""
    blog = db.query(BlogPostModel).filter(BlogPostModel.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    try:
        if blog_data.title is not None:
            blog.title = blog_data.title
        if blog_data.content is not None:
            blog.content = blog_data.content
        if blog_data.featured is not None:
            blog.featured = blog_data.featured
        
        db.commit()
        db.refresh(blog)
        
        return Blog(
            id=blog.id,
            title=blog.title,
            content=blog.content,
            slug=blog.slug,
            featured=blog.featured,
            created_at=blog.created_at,
            updated_at=blog.updated_at,
            author=blog.author
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to update blog: {str(e)}")


@router.delete("/{blog_id}")
def delete_blog(blog_id: str, db: Session = Depends(get_db)):
    """Delete blog post"""
    blog = db.query(BlogPostModel).filter(BlogPostModel.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    try:
        db.delete(blog)
        db.commit()
        return {"status": "success", "message": "Blog deleted"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to delete blog: {str(e)}")


@router.get("/stats/all")
def blog_stats(db: Session = Depends(get_db)):
    """Get blog statistics"""
    total = db.query(BlogPostModel).count()
    featured = db.query(BlogPostModel).filter(BlogPostModel.featured == True).count()
    return {
        "total_blogs": total,
        "featured": featured,
        "draft": total - featured
    }
