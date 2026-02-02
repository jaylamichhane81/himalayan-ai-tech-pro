"""
Backend Health Check & Endpoint Testing
Tests all API endpoints for full integration
"""

import requests
import json
import os
from datetime import datetime

# Configuration
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:10000")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

class APITester:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.token = None
        self.results = []

    def log(self, test_name: str, status: str, details: str = ""):
        """Log test results"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        result = {
            "timestamp": timestamp,
            "test": test_name,
            "status": status,
            "details": details
        }
        self.results.append(result)
        
        status_symbol = "✓" if status == "PASS" else "✗"
        color = "\033[92m" if status == "PASS" else "\033[91m"
        reset = "\033[0m"
        print(f"{color}{status_symbol} [{timestamp}] {test_name}: {status}{reset}")
        if details:
            print(f"  └─ {details}")

    def test_health_check(self):
        """Test basic health endpoints"""
        try:
            resp = requests.get(f"{self.base_url}/health", timeout=5)
            if resp.status_code == 200:
                self.log("Health Check", "PASS", f"Response: {resp.json()}")
            else:
                self.log("Health Check", "FAIL", f"Status: {resp.status_code}")
        except Exception as e:
            self.log("Health Check", "FAIL", str(e))

    def test_root_endpoint(self):
        """Test root endpoint"""
        try:
            resp = requests.get(f"{self.base_url}/", timeout=5)
            if resp.status_code == 200:
                self.log("Root Endpoint", "PASS", f"Service running")
            else:
                self.log("Root Endpoint", "FAIL", f"Status: {resp.status_code}")
        except Exception as e:
            self.log("Root Endpoint", "FAIL", str(e))

    def test_authentication(self):
        """Test login and token generation"""
        try:
            resp = requests.post(
                f"{self.base_url}/auth/login",
                json={
                    "username": ADMIN_USERNAME,
                    "password": ADMIN_PASSWORD
                },
                timeout=5
            )
            if resp.status_code == 200:
                data = resp.json()
                self.token = data.get("access_token")
                self.log("Authentication", "PASS", f"Token generated: {self.token[:20]}...")
            else:
                self.log("Authentication", "FAIL", f"Status: {resp.status_code}")
        except Exception as e:
            self.log("Authentication", "FAIL", str(e))

    def test_protected_endpoint(self):
        """Test protected endpoint with token"""
        if not self.token:
            self.log("Protected Endpoint", "SKIP", "No token available")
            return

        try:
            resp = requests.get(
                f"{self.base_url}/dashboard/stats",
                headers={"Authorization": f"Bearer {self.token}"},
                timeout=5
            )
            if resp.status_code == 200:
                self.log("Protected Endpoint", "PASS", f"Stats: {resp.json()}")
            else:
                self.log("Protected Endpoint", "FAIL", f"Status: {resp.status_code}")
        except Exception as e:
            self.log("Protected Endpoint", "FAIL", str(e))

    def test_chat_endpoint(self):
        """Test AI chat endpoint"""
        if not self.token:
            self.log("Chat Endpoint", "SKIP", "No token available")
            return

        try:
            resp = requests.post(
                f"{self.base_url}/ai/chat",
                json={"message": "Hello, what is Himalayan AI?"},
                headers={"Authorization": f"Bearer {self.token}"},
                timeout=10
            )
            if resp.status_code == 200:
                self.log("Chat Endpoint", "PASS", f"Response received")
            else:
                self.log("Chat Endpoint", "FAIL", f"Status: {resp.status_code}")
        except Exception as e:
            self.log("Chat Endpoint", "FAIL", str(e))

    def test_contact_endpoint(self):
        """Test contact form endpoint"""
        try:
            resp = requests.post(
                f"{self.base_url}/contact/",
                json={
                    "name": "Test User",
                    "email": "test@example.com",
                    "message": "Test contact message"
                },
                timeout=5
            )
            if resp.status_code in [200, 201]:
                self.log("Contact Endpoint", "PASS", f"Message submitted")
            else:
                self.log("Contact Endpoint", "FAIL", f"Status: {resp.status_code}")
        except Exception as e:
            self.log("Contact Endpoint", "FAIL", str(e))

    def test_blog_endpoint(self):
        """Test blog endpoints"""
        try:
            # Test GET
            resp_get = requests.get(f"{self.base_url}/blog/", timeout=5)
            if resp_get.status_code == 200:
                self.log("Blog GET", "PASS", f"Retrieved blogs")
            else:
                self.log("Blog GET", "FAIL", f"Status: {resp_get.status_code}")

            # Test POST
            if self.token:
                resp_post = requests.post(
                    f"{self.base_url}/blog/",
                    json={
                        "title": "Test Blog",
                        "content": "Test content",
                        "author": "Test Author"
                    },
                    headers={"Authorization": f"Bearer {self.token}"},
                    timeout=5
                )
                if resp_post.status_code in [200, 201]:
                    self.log("Blog POST", "PASS", f"Blog created")
                else:
                    self.log("Blog POST", "FAIL", f"Status: {resp_post.status_code}")
        except Exception as e:
            self.log("Blog Endpoint", "FAIL", str(e))

    # Payment provider endpoint tests removed - Khalti & eSewa integrations disabled
    # If payment provider tests are needed in the future, add tests for the desired providers here.

    # Payment history tests removed - payments have been removed from this project
    # If you need to validate legacy records, add tests here to query the database or re-enable appropriate endpoints.

    def run_all_tests(self):
        """Run all tests"""
        print("\n" + "="*60)
        print("🚀 HIMALAYAN AI BACKEND - FULL INTEGRATION TEST")
        print("="*60 + "\n")
        
        print(f"Testing Backend: {self.base_url}\n")
        
        # Basic connectivity
        self.test_root_endpoint()
        self.test_health_check()
        
        # Authentication
        print("\n--- Authentication Tests ---")
        self.test_authentication()
        
        # Protected endpoints
        print("\n--- Protected Endpoint Tests ---")
        self.test_protected_endpoint()
        self.test_chat_endpoint()
        self.test_blog_endpoint()
        
        # Public endpoints
        print("\n--- Public Endpoint Tests ---")
        self.test_contact_endpoint()
        # Payment endpoint tests removed - Khalti & eSewa integrations disabled
        # If you need to validate legacy payment records, add test functions here.
        
        # Summary
        print("\n" + "="*60)
        passed = sum(1 for r in self.results if r["status"] == "PASS")
        failed = sum(1 for r in self.results if r["status"] == "FAIL")
        skipped = sum(1 for r in self.results if r["status"] == "SKIP")
        
        print(f"\n📊 TEST SUMMARY:")
        print(f"  ✓ Passed:  {passed}")
        print(f"  ✗ Failed:  {failed}")
        print(f"  ⊘ Skipped: {skipped}")
        print(f"  Total:   {len(self.results)}\n")
        
        if failed == 0:
            print("✅ ALL TESTS PASSED! Backend is fully operational.\n")
        else:
            print(f"⚠️  {failed} test(s) failed. Please check the issues above.\n")
        
        print("="*60)
        
        return self.results


if __name__ == "__main__":
    tester = APITester(BACKEND_URL)
    tester.run_all_tests()
