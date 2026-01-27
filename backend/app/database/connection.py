
"""
Database Connection Configuration
Uses SQLAlchemy ORM for PostgreSQL database management
"""

from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from sqlalchemy.pool import StaticPool

# Get database URL from environment or use SQLite for development
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./test.db"  # SQLite for local development
)

# Connection settings based on database type
if "postgresql" in DATABASE_URL:
    # PostgreSQL production settings
    engine = create_engine(
        DATABASE_URL,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,  # Test connections before using
        echo=os.getenv("SQL_ECHO", "false").lower() == "true"
    )
else:
    # SQLite development settings
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        echo=os.getenv("SQL_ECHO", "false").lower() == "true"
    )

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()

def get_db():
    """Dependency for getting database session in routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
