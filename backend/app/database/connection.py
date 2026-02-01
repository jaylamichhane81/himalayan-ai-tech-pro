
"""
Database Connection Configuration
Uses SQLAlchemy ORM for PostgreSQL database management
"""

from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from sqlalchemy.pool import StaticPool

# Base class for all models
Base = declarative_base()

# Get database URL from environment or use SQLite for development
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./test.db"  # SQLite for local development
)

# Initialize engine and session - make it safe for startup
try:
    # Validate DATABASE_URL
    if not DATABASE_URL or DATABASE_URL.strip() == "":
        DATABASE_URL = "sqlite:///./test.db"  # Fallback to SQLite
    
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
except Exception as e:
    # If database initialization fails, use SQLite as fallback
    print(f"Warning: Failed to initialize database with {DATABASE_URL}: {e}")
    print("Falling back to SQLite...")
    engine = create_engine(
        "sqlite:///./test.db",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        echo=False
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Dependency for getting database session in routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
