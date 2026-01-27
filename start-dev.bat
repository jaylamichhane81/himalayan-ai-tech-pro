@echo off
REM Himalayan AI Tech Pro - Local Development Startup Script
REM Starts both backend and frontend servers for local development

echo ================================
echo Himalayan AI Tech Pro - Local Dev
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    exit /b 1
)

REM Start backend
echo.
echo [1/2] Starting Backend Server...
echo Backend will run on: http://localhost:10000
echo API Docs available at: http://localhost:10000/docs
echo.

cd backend

REM Check if virtual environment exists
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies if needed
pip show fastapi >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r requirements.txt
)

REM Check if .env exists, if not create one
if not exist .env (
    echo Creating .env file with development defaults...
    (
        echo DATABASE_URL=sqlite:///./test.db
        echo JWT_SECRET=himalayan-secret-key-change-in-production
        echo ADMIN_USERNAME=admin
        echo ADMIN_PASSWORD=admin123
        echo ALLOWED_ORIGINS=http://localhost:3000,http://localhost:10000
        echo ENVIRONMENT=development
        echo DEBUG=true
    ) > .env
)

REM Start backend in new terminal
start cmd /k "cd backend && venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 0.0.0.0 --port 10000"

cd ..

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start frontend
echo [2/2] Starting Frontend Server...
echo Frontend will run on: http://localhost:3000
echo.

cd frontend

REM Install dependencies if needed
if not exist node_modules (
    echo Installing Node dependencies...
    call npm install
)

REM Check if .env.local exists, if not create one
if not exist .env.local (
    echo Creating .env.local file...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:10000
    ) > .env.local
)

REM Start frontend in new terminal
start cmd /k "cd frontend && npm run dev"

cd ..

echo.
echo ================================
echo Both servers are starting...
echo.
echo Backend: http://localhost:10000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:10000/docs
echo.
echo Press CTRL+C in either terminal to stop the server
echo ================================
echo.
