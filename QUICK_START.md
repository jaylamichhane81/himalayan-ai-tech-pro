# 🚀 Quick Start Guide

Get Himalayan AI Tech Pro running in 5 minutes!

---

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.9+ (for backend)
- **Git** (for version control)
- **Terminal/Command Prompt** (for running commands)

---

## ⚡ 5-Minute Setup

### Step 1: Clone Repository
```bash
cd ~/projects
git clone https://github.com/yourusername/himalayan-ai-tech-pro.git
cd himalayan-ai-tech-pro
```

### Step 2: Backend Setup (Terminal 1)
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start server
uvicorn app.main:app --reload --port 10000
```

You should see:
```
Uvicorn running on http://127.0.0.1:10000
```

Visit http://localhost:10000/docs to see interactive API documentation.

### Step 3: Frontend Setup (Terminal 2)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
> ready on http://localhost:3000
```

Visit http://localhost:3000 - Your site is live! 🎉

---

## 🎯 First Actions

### Test Contact Form
1. Scroll to "Contact" section
2. Fill in: Name, Email, Project Description
3. Click "Send Message"
4. Should see: ✅ "Thank you!" message

### Test Admin Login
1. Visit http://localhost:3000/admin
2. Use credentials:
   - Username: `admin`
   - Password: `admin123`
3. See dashboard with stats

### Test API Directly
```bash
# Get API health
curl http://localhost:10000/health

# Test AI chat
curl -X POST http://localhost:10000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Test contact form
curl -X POST http://localhost:10000/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "project": "I need an AI chatbot for my business"
  }'
```

---

## 📁 File Structure Quick Reference

**Frontend changes?** Edit files in `frontend/`:
- Pages: `app/page.tsx`
- Components: `components/*.tsx`
- Styles: `app/globals.css`
- API calls: `lib/api.ts`

**Backend changes?** Edit files in `backend/app/`:
- Routes: `routers/*.py`
- Models: `models.py`
- Main app: `main.py`

---

## 🔧 Common Development Tasks

### Add New API Endpoint

**Backend** (`backend/app/routers/newfeature.py`):
```python
from fastapi import APIRouter
from ..models import YourModel

router = APIRouter(prefix="/newfeature")

@router.post("/action")
def your_endpoint(data: YourModel):
    return {"status": "success"}
```

**Then in** `backend/app/main.py`:
```python
from .routers import newfeature
app.include_router(newfeature.router)
```

### Call New Endpoint from Frontend

**In** `frontend/lib/api.ts`:
```typescript
export const endpoints = {
  // ... existing endpoints
  newfeature: '/newfeature/action'
}
```

**In any component**:
```typescript
const response = await fetch(
  `${apiUrl}${endpoints.newfeature}`,
  { method: 'POST', body: JSON.stringify(data) }
)
```

### Update Styles

**Edit** `frontend/app/globals.css` for global styles.

**Edit** component files for Tailwind classes:
```tsx
<div className="bg-gradient-to-r from-cyan-400 to-purple-600">
  {/* Your content */}
</div>
```

---

## 🐛 Debugging Tips

### Backend Issues

**Error: ModuleNotFoundError**
```bash
pip install -r requirements.txt
```

**Error: Port 10000 already in use**
```bash
# Use different port
uvicorn app.main:app --port 8000
```

**Error: CORS problems**
- Check `ALLOWED_ORIGINS` in `.env`
- Frontend URL must be in the list

### Frontend Issues

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

**API calls returning 404**
- Verify backend is running on port 10000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

---

## 📱 Testing on Mobile

### Desktop Testing
```bash
# Visit http://localhost:3000 in your browser
# Press F12 to open DevTools
# Click device toggle (top left) to view mobile layout
```

### Real Device Testing
```bash
# Find your machine's IP
# Windows: ipconfig → IPv4 Address
# Mac/Linux: ifconfig → inet address

# Visit: http://YOUR_IP:3000 from phone
# Must be on same WiFi network
```

---

## 🚀 Ready to Deploy?

### Deploy Backend to Render
See `PRODUCTION_DEPLOYMENT_v2.md` for step-by-step guide.

### Deploy Frontend to Vercel
See `PRODUCTION_DEPLOYMENT_v2.md` for step-by-step guide.

---

## 📚 Essential Files

- **README.md** - Project overview
- **SETUP_COMPLETE.md** - Detailed setup instructions
- **PRODUCTION_DEPLOYMENT_v2.md** - Deployment guide
- **TECHNICAL_ARCHITECTURE.md** - System design
- **CLIENT_GUIDE.md** - Client documentation
- **.github/copilot-instructions.md** - AI assistant guidelines

---

## 💡 Pro Tips

1. **Hot Reload**: Both frontend and backend auto-reload on file changes
2. **API Docs**: Visit http://localhost:10000/docs for interactive API testing
3. **Environment Variables**: Never commit `.env` file, use `.env.example`
4. **Git Commits**: Commit early and often with clear messages
5. **Database**: For production, use PostgreSQL (switch in `.env`)

---

## 🆘 Need Help?

### Check These Files First
1. Error occurs? → `PRODUCTION_DEPLOYMENT_v2.md` Troubleshooting section
2. Want to understand system? → `TECHNICAL_ARCHITECTURE.md`
3. Client needs help? → `CLIENT_GUIDE.md`
4. How to use AI features? → `.github/copilot-instructions.md`

### Common Questions

**Q: How do I change the admin password?**
A: Edit `ADMIN_PASSWORD` in `.env`, restart backend

**Q: Can I use SQLite instead of PostgreSQL?**
A: Yes! Change `DATABASE_URL` in `.env` to: `sqlite:///./himalayan_ai.db`

**Q: How do I add more admins?**
A: Currently single admin. For multiple users, implement user management endpoint.

**Q: Where are form submissions stored?**
A: Currently in memory (lost on restart). For production, enable PostgreSQL.

---

## ✅ You're All Set!

Your Himalayan AI Tech Pro platform is now running locally. You can:

- ✅ View the landing page
- ✅ Test the contact form
- ✅ Access the admin dashboard
- ✅ Test API endpoints
- ✅ Make changes and see them instantly

**Next Steps:**
1. Customize branding (colors, fonts, logos)
2. Update content (services, about, testimonials)
3. Connect payment gateways (Khalti, eSewa)
4. Deploy to Render and Vercel
5. Set up custom domain

Happy building! 🚀
