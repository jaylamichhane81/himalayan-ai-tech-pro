#!/bin/bash

# Himalayan AI Tech Pro - Local Development Startup Script
# Starts both backend and frontend servers for local development

echo "================================"
echo "Himalayan AI Tech Pro - Local Dev"
echo "================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Setup Backend
echo ""
echo "[1/2] Setting up Backend Server..."
echo "Backend will run on: http://localhost:10000"
echo "API Docs available at: http://localhost:10000/docs"
echo ""

cd "$SCRIPT_DIR/backend"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if ! pip show fastapi > /dev/null; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file with development defaults..."
    cat > .env << EOF
DATABASE_URL=sqlite:///./test.db
JWT_SECRET=himalayan-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:10000
ENVIRONMENT=development
DEBUG=true
EOF
fi

# Start backend server in background
echo "Starting Backend server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 10000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Setup Frontend
echo ""
echo "[2/2] Setting up Frontend Server..."
echo "Frontend will run on: http://localhost:3000"
echo ""

cd "$SCRIPT_DIR/frontend"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:10000
EOF
fi

# Start frontend server
echo "Starting Frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait for both to complete
echo ""
echo "================================"
echo "Both servers are running..."
echo ""
echo "Backend: http://localhost:10000"
echo "Frontend: http://localhost:3000"
echo "API Docs: http://localhost:10000/docs"
echo ""
echo "Press CTRL+C to stop"
echo "================================"
echo ""

# Handle Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT

# Wait for processes
wait
