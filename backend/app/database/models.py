"""
SQLAlchemy Database Models
Defines the schema for all database tables
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
from .connection import Base

class BlogPost(Base):
    """Blog post database model"""
    __tablename__ = "blog_posts"

    id = Column(String(36), primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    content = Column(Text, nullable=False)
    slug = Column(String(250), unique=True, index=True, nullable=False)
    featured = Column(Boolean, default=False, index=True)
    author = Column(String(100), nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    __table_args__ = (
        Index('idx_blog_created', 'created_at'),
        Index('idx_blog_featured', 'featured'),
    )


class Contact(Base):
    """Contact form submission database model"""
    __tablename__ = "contacts"

    id = Column(String(36), primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    project = Column(Text, nullable=False)
    phone = Column(String(20), nullable=True)
    budget = Column(String(100), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False, index=True)

    __table_args__ = (
        Index('idx_contact_created', 'created_at'),
        Index('idx_contact_email', 'email'),
    )


class ChatSession(Base):
    """Chat session and message history database model"""
    __tablename__ = "chat_sessions"

    id = Column(String(36), primary_key=True, index=True)
    session_id = Column(String(36), nullable=False, index=True)
    user_message = Column(Text, nullable=False)
    ai_reply = Column(Text, nullable=False)
    user_info = Column(String(255), default="anonymous")
    created_at = Column(DateTime, server_default=func.now(), nullable=False, index=True)

    __table_args__ = (
        Index('idx_chat_session', 'session_id'),
        Index('idx_chat_created', 'created_at'),
    )


# Payment model removed
# The `Payment` SQLAlchemy model and corresponding `payments` table have been removed from the schema.
# If you need to restore payments later, add the model back and provide migration scripts.
