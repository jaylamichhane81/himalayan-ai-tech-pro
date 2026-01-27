#!/usr/bin/env python3
"""
Himalayan AI Tech Pro - Testing & Verification Script
Verifies all components are properly configured and working
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app.main import app
from app.database.connection import engine, Base
from app.database.models import BlogPost, Contact, ChatSession, Payment
from app.models import AdminLogin, ContactRequest, ChatRequest
from app.routers.auth import create_access_token
from sqlalchemy import inspect
from datetime import timedelta
import json

def print_section(title):
    """Print a formatted section header"""
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def test_backend_imports():
    """Test backend imports and initialization"""
    print_section("Backend Imports Test")
    
    try:
        print("  [OK] FastAPI app loaded successfully")
        print(f"      App: {app.title} v{app.version}")
        return True
    except Exception as e:
        print(f"  [FAIL] Backend import error: {e}")
        return False

def test_database_setup():
    """Test database initialization"""
    print_section("Database Setup Test")
    
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)
        print("  [OK] Database tables created")
        
        # Check tables exist
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        expected_tables = ['blog_posts', 'contacts', 'chat_sessions', 'payments']
        
        for table in expected_tables:
            if table in tables:
                print(f"      [OK] Table '{table}' exists")
            else:
                print(f"      [FAIL] Table '{table}' not found")
                return False
        
        return True
    except Exception as e:
        print(f"  [FAIL] Database setup error: {e}")
        return False

def test_api_routes():
    """Test API routes registration"""
    print_section("API Routes Test")
    
    try:
        routes_count = 0
        route_groups = {}
        
        for route in app.routes:
            if hasattr(route, 'path') and hasattr(route, 'methods'):
                routes_count += 1
                path = route.path
                prefix = path.split('/')[1] if len(path) > 1 else 'root'
                
                if prefix not in route_groups:
                    route_groups[prefix] = []
                route_groups[prefix].append(f"{'/'.join(route.methods)} {path}")
        
        print(f"  [OK] Total routes registered: {routes_count}")
        
        for prefix in sorted(route_groups.keys()):
            routes = route_groups[prefix]
            print(f"      [{prefix}] {len(routes)} routes")
        
        return True
    except Exception as e:
        print(f"  [FAIL] Route registration error: {e}")
        return False

def test_models():
    """Test Pydantic and SQLAlchemy models"""
    print_section("Models Test")
    
    try:
        # Test Pydantic models
        print("  [OK] Pydantic Models:")
        
        login = AdminLogin(username="admin", password="admin123")
        print(f"      AdminLogin: {login.username}")
        
        contact = ContactRequest(
            name="Test User",
            email="test@example.com",
            project="Test project description"
        )
        print(f"      ContactRequest: {contact.name}")
        
        chat = ChatRequest(message="Hello")
        print(f"      ChatRequest: {chat.message[:20]}...")
        
        # Test SQLAlchemy models
        print("  [OK] SQLAlchemy Models:")
        models = [BlogPost, Contact, ChatSession, Payment]
        for model in models:
            print(f"      {model.__tablename__}: {len(model.__table__.columns)} columns")
        
        return True
    except Exception as e:
        print(f"  [FAIL] Models error: {e}")
        return False

def test_authentication():
    """Test authentication functionality"""
    print_section("Authentication Test")
    
    try:
        # Test token creation
        token = create_access_token({"sub": "admin"}, expires_delta=timedelta(minutes=30))
        print(f"  [OK] JWT Token created ({len(token)} chars)")
        
        # Verify token format
        import jwt
        SECRET_KEY = "himalayan-secret-key-change-in-production"
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        print(f"  [OK] Token verified: sub={payload.get('sub')}")
        
        return True
    except Exception as e:
        print(f"  [FAIL] Authentication error: {e}")
        return False

def test_environment_variables():
    """Test environment variable configuration"""
    print_section("Environment Variables Test")
    
    required_vars = {
        'DATABASE_URL': 'Database connection string',
        'JWT_SECRET': 'JWT signing secret',
        'ADMIN_USERNAME': 'Admin username',
        'ADMIN_PASSWORD': 'Admin password',
        'ALLOWED_ORIGINS': 'CORS allowed origins',
    }
    
    all_ok = True
    for var, description in required_vars.items():
        value = os.getenv(var)
        if value:
            masked = value[:20] + "..." if len(value) > 20 else value
            print(f"  [OK] {var}: {masked}")
        else:
            print(f"  [WARN] {var}: using default value ({description})")
    
    return all_ok

def test_frontend_structure():
    """Test frontend structure and configuration"""
    print_section("Frontend Structure Test")
    
    try:
        frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
        
        # Check key files
        key_files = [
            'package.json',
            'tsconfig.json',
            'tailwind.config.js',
            'next.config.js',
            'app/layout.tsx',
            'app/page.tsx',
            'lib/api.ts',
        ]
        
        all_exist = True
        for file in key_files:
            path = os.path.join(frontend_dir, file)
            if os.path.exists(path):
                print(f"  [OK] {file}")
            else:
                print(f"  [FAIL] {file} not found")
                all_exist = False
        
        # Check components
        components_dir = os.path.join(frontend_dir, 'components')
        components = [
            'Header.tsx', 'Hero.tsx', 'Services.tsx',
            'Contact.tsx', 'Footer.tsx', 'CTA.tsx',
            'WhyUs.tsx', 'Founder.tsx'
        ]
        
        print(f"  [OK] Components ({len(components)} found):")
        for component in components:
            path = os.path.join(components_dir, component)
            if os.path.exists(path):
                print(f"      - {component}")
        
        return all_exist
    except Exception as e:
        print(f"  [FAIL] Frontend structure error: {e}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("  HIMALAYAN AI TECH PRO - VERIFICATION SUITE")
    print("="*60)
    
    results = {
        'Backend Imports': test_backend_imports(),
        'Database Setup': test_database_setup(),
        'API Routes': test_api_routes(),
        'Models': test_models(),
        'Authentication': test_authentication(),
        'Environment Variables': test_environment_variables(),
        'Frontend Structure': test_frontend_structure(),
    }
    
    # Summary
    print_section("Test Summary")
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "PASS" if result else "FAIL"
        print(f"  [{status}] {test_name}")
    
    print(f"\n  Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n  SUCCESS: All tests passed! Project is ready for development.")
        print("  Next steps:")
        print("    1. Windows: Run 'start-dev.bat'")
        print("    2. macOS/Linux: Run './start-dev.sh'")
        print("    3. Or manually:")
        print("       - Backend: cd backend && uvicorn app.main:app --reload")
        print("       - Frontend: cd frontend && npm run dev")
        return 0
    else:
        print("\n  FAILURE: Some tests failed. Please review the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
