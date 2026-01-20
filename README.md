# Himalayan AI Tech Pro

A full-stack web application combining a FastAPI backend with a modern Next.js frontend. This project demonstrates enterprise-grade AI integration with professional UI design.

## 🚀 Features

- **FastAPI Backend**: Robust REST API with multiple endpoints for AI chat, authentication, blog management, payments, and contact forms
- **Next.js Frontend**: Modern React-based UI with TypeScript, featuring landing page, AI chat demo, and admin dashboard
- **Professional Design**: Enterprise-grade UI with smooth animations, responsive layouts, and custom branding
- **AI Integration**: POST `/ai/chat` endpoint for intelligent conversations
- **Payment Integration**: Khalti and eSewa payment processing
- **Database Ready**: SQLAlchemy ORM with PostgreSQL support

## 📋 Project Structure

```
himalayan-ai-tech-pro/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── database/
│   │   │   └── connection.py    # Database configuration
│   │   └── routers/
│   │       ├── auth.py          # Authentication endpoints
│   │       ├── ai.py            # AI chat endpoint
│   │       ├── blog.py          # Blog management
│   │       ├── contact.py       # Contact form
│   │       └── payment.py       # Payment endpoints
│   ├── requirements.txt         # Python dependencies
│   └── render.yaml             # Render deployment config
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── ai-demos/page.tsx   # AI chat interface
│   │   ├── dashboard/page.tsx  # Admin dashboard
│   │   └── layout.tsx          # Root layout
│   ├── package.json            # Node dependencies
│   └── tsconfig.json           # TypeScript config
└── .github/copilot-instructions.md  # AI agent guidance
```

## ⚙️ Tech Stack

### Backend
- **Python 3.12.8** with FastAPI framework
- **Uvicorn** ASGI server
- **SQLAlchemy** ORM with PostgreSQL
- **JWT** authentication
- **CORS** middleware for frontend integration

### Frontend
- **Next.js 15.0.0** with App Router
- **React 18.2.0** for UI components
- **TypeScript 5.0.0** for type safety
- **CSS-in-JS** inline styling

## 🔧 Installation & Setup

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo DATABASE_URL=postgresql://user:password@localhost/himalayan_ai > .env
echo JWT_SECRET=your-secret-key >> .env

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 10000
```

Backend will be available at: `http://localhost:10000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo NEXT_PUBLIC_API_URL=http://localhost:10000 > .env.local

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:3001`

## 📚 API Endpoints

### Authentication
- `POST /auth/login` - Login (default: admin/admin123)
  - Request: `{"username": "admin", "password": "admin123"}`
  - Response: `{"token": "<jwt_token>"}`

### AI Chat
- `POST /ai/chat` - Send message to AI
  - Request: `{"message": "Your question"}`
  - Response: `{"reply": "AI response"}`

### Blog
- `GET /blog/` - Retrieve all blog posts
- `POST /blog/` - Create new blog post
  - Request: `{"title": "...", "content": "..."}`

### Contact
- `POST /contact/` - Submit contact form
  - Request: `{"name": "...", "email": "...", "message": "..."}`

### Payment
- `POST /payment/khalti` - Khalti payment processing
- `POST /payment/esewa` - eSewa payment processing

## 🎨 Design

- **Color Scheme**: Professional blue (#6366f1, #a855f7, #ec4899)
- **Typography**: System font stack for optimal performance
- **Layout**: Responsive grid-based design
- **Animations**: Smooth hover effects and transitions

## 📱 Pages

1. **Landing Page** (`/`) - Hero section with features, testimonials, pricing, and CTA
2. **AI Demo** (`/ai-demos`) - Interactive chat interface with message history
3. **Dashboard** (`/dashboard`) - Admin panel with navigation and multiple tabs

## 🚀 Deployment

### Backend (Render)
```bash
# Using render.yaml configuration
# Service will run: uvicorn app.main:app --host 0.0.0.0 --port 10000
```

### Frontend (Vercel/Similar)
```bash
npm run build
npm start
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/db_name
JWT_SECRET=your-secret-key
ENVIRONMENT=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:10000
```

## 🔐 Security Notes

- ⚠️ Default credentials (admin/admin123) should be changed in production
- ⚠️ JWT secret should be moved to environment variables
- ⚠️ CORS is currently set to allow all origins - restrict in production
- ⚠️ Database credentials should use environment variables

## 📦 Dependencies

### Backend
- fastapi
- uvicorn
- sqlalchemy
- psycopg2-binary
- pyjwt
- python-dotenv

### Frontend
- next
- react
- typescript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with clear messages
5. Push to your fork
6. Submit a pull request

## 📄 License

This project is built for Himalayan AI Tech Pro.

## 👥 Author

Jayram Lamichhane - jay.lamichhane36@gmail.com

---

**Happy Coding! 🚀**
