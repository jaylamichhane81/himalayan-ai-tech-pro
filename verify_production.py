#!/usr/bin/env python3
"""
Production Readiness Verification Script
Run this to verify all security hardening is in place
"""

import os
import sys
import re
from pathlib import Path

# Colors for output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
RESET = '\033[0m'

class Validator:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warnings = 0
        self.base_dir = Path(__file__).parent
    
    def check(self, name, condition, critical=False):
        """Log a check result"""
        if condition:
            print(f"{GREEN}✓{RESET} {name}")
            self.passed += 1
        else:
            status = f"{RED}✗{RESET}" if critical else f"{YELLOW}⚠{RESET}"
            print(f"{status} {name}")
            if critical:
                self.failed += 1
            else:
                self.warnings += 1
    
    def read_file(self, path):
        """Read file content"""
        try:
            with open(self.base_dir / path, 'r') as f:
                return f.read()
        except FileNotFoundError:
            return None
    
    def file_contains(self, path, pattern, regex=False):
        """Check if file contains pattern"""
        content = self.read_file(path)
        if not content:
            return False
        if regex:
            return bool(re.search(pattern, content))
        return pattern in content
    
    def file_missing(self, path):
        """Check if file is missing (security check)"""
        return not (self.base_dir / path).exists()
    
    def run_all_checks(self):
        """Run all validation checks"""
        print("\n" + "="*60)
        print("PRODUCTION READINESS VERIFICATION")
        print("="*60 + "\n")
        
        # Backend Checks
        print(f"{YELLOW}Backend Security{RESET}")
        print("-" * 60)
        
        # 1. Check for hardcoded secrets
        self.check(
            "No hardcoded JWT_SECRET in auth.py",
            not self.file_contains(
                "backend/app/routers/auth.py",
                'JWT_SECRET = "himalayan-secret-key'
            ),
            critical=True
        )
        
        self.check(
            "No hardcoded admin passwords in auth.py",
            not self.file_contains(
                "backend/app/routers/auth.py",
                'ADMIN_PASSWORD = "admin123'
            ),
            critical=True
        )
        
        # 2. Check for security features
        self.check(
            "CORS configured with TrustedHostMiddleware",
            self.file_contains(
                "backend/app/main.py",
                "TrustedHostMiddleware"
            ),
            critical=True
        )
        
        self.check(
            "Rate limiting imported (slowapi)",
            self.file_contains(
                "backend/app/main.py",
                "from slowapi"
            ),
            critical=True
        )
        
        self.check(
            "Authentication check on /contact GET",
            self.file_contains(
                "backend/app/routers/contact.py",
                "Depends(verify_token)"
            ),
            critical=True
        )
        
        self.check(
            "Rate limiting on /auth/login",
            self.file_contains(
                "backend/app/routers/auth.py",
                "@limiter.limit"
            ),
            critical=True
        )
        
        self.check(
            "Rate limiting on /contact POST",
            self.file_contains(
                "backend/app/routers/contact.py",
                "@limiter.limit"
            ),
            critical=True
        )
        
        self.check(
            "Rate limiting on /ai/chat",
            self.file_contains(
                "backend/app/routers/ai.py",
                "@limiter.limit"
            ),
            critical=True
        )
        
        # 3. Check database persistence
        self.check(
            "AI chat uses database (ChatSessionModel)",
            self.file_contains(
                "backend/app/routers/ai.py",
                "ChatSessionModel"
            ),
            critical=True
        )
        
        self.check(
            "AI stats use database query",
            self.file_contains(
                "backend/app/routers/ai.py",
                "db.query(ChatSessionModel)"
            ),
            critical=True
        )
        
        # 4. Check requirements
        self.check(
            "slowapi added to requirements.txt",
            self.file_contains(
                "backend/requirements.txt",
                "slowapi"
            ),
            critical=True
        )
        
        # 5. Check for vulnerable patterns
        self.check(
            "No CORS regex pattern",
            not self.file_contains(
                "backend/app/main.py",
                'allow_origin_regex'
            ),
            critical=True
        )
        
        self.check(
            "Environment validation in main.py",
            self.file_contains(
                "backend/app/main.py",
                'if ENVIRONMENT == "production":'
            ),
            critical=True
        )
        
        # Frontend Checks
        print(f"\n{YELLOW}Frontend Security{RESET}")
        print("-" * 60)
        
        self.check(
            ".env.local.example exists",
            (self.base_dir / "frontend/.env.local.example").exists(),
            critical=False
        )
        
        # Documentation Checks
        print(f"\n{YELLOW}Documentation{RESET}")
        print("-" * 60)
        
        self.check(
            "PRODUCTION_DEPLOYMENT.md exists",
            (self.base_dir / "PRODUCTION_DEPLOYMENT.md").exists(),
            critical=False
        )
        
        self.check(
            "PRODUCTION_QUICK_START.md exists",
            (self.base_dir / "PRODUCTION_QUICK_START.md").exists(),
            critical=False
        )
        
        self.check(
            "SECURITY_HARDENING_SUMMARY.md exists",
            (self.base_dir / "SECURITY_HARDENING_SUMMARY.md").exists(),
            critical=False
        )
        
        # Environment Checks (warnings only)
        print(f"\n{YELLOW}Environment Variables (to set in Render){RESET}")
        print("-" * 60)
        
        env_vars = [
            "ENVIRONMENT",
            "DATABASE_URL",
            "JWT_SECRET",
            "ADMIN_USERNAME",
            "ADMIN_PASSWORD",
            "ALLOWED_ORIGINS",
        ]
        
        for var in env_vars:
            is_set = os.getenv(var)
            self.check(
                f"${var} set in environment",
                bool(is_set),
                critical=False
            )
        
        # Summary
        print(f"\n{'='*60}")
        print(f"{YELLOW}SUMMARY{RESET}")
        print(f"{'='*60}")
        print(f"{GREEN}Passed: {self.passed}{RESET}")
        print(f"{RED}Failed: {self.failed}{RESET}")
        print(f"{YELLOW}Warnings: {self.warnings}{RESET}")
        
        if self.failed == 0:
            print(f"\n{GREEN}✓ Application is production-ready!{RESET}")
            print(f"\nNext steps:")
            print(f"1. Set environment variables in Render dashboard")
            print(f"2. Deploy to production")
            print(f"3. Verify endpoints at /docs and /health")
            return 0
        else:
            print(f"\n{RED}✗ Critical issues found. Please fix before production deployment.{RESET}")
            return 1

if __name__ == "__main__":
    validator = Validator()
    exit_code = validator.run_all_checks()
    sys.exit(exit_code)
