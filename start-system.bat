@echo off
REM Himalayan AI Tech Pro - Quick Start Script
REM Starts backend and frontend simultaneously

echo.
echo ============================================================
echo   HIMALAYAN AI TECH PRO - STARTING SYSTEM
echo ============================================================
echo.

REM Set color support
setlocal enabledelayedexpansion

REM Check if backend is already running
netstat -ano | findstr :8000 >nul
if errorlevel 1 (
    echo [*] Starting Backend Server...
    echo [*] Command: python -m uvicorn backend.app.main:app --reload --port 8000
    echo [*] Backend will run on: http://localhost:8000
    echo.
    start cmd /k "cd /d %cd% && python -m uvicorn backend.app.main:app --reload --port 8000"
    timeout /t 3 /nobreak
) else (
    echo [!] Backend already running on port 8000
    echo.
)

REM Check if frontend is already running
netstat -ano | findstr :3000 >nul
if errorlevel 1 (
    echo [*] Starting Frontend Server...
    echo [*] Command: cd frontend && npm run dev
    echo [*] Frontend will run on: http://localhost:3000
    echo.
    start cmd /k "cd /d %cd%\frontend && npm run dev"
    timeout /t 3 /nobreak
) else (
    echo [!] Frontend already running on port 3000
    echo.
)

echo.
echo ============================================================
echo   SYSTEM STARTUP COMPLETE
echo ============================================================
echo.
echo [i] Backend: http://localhost:8000
echo [i] Frontend: http://localhost:3000
echo [i] Health check: curl http://localhost:8000/health
echo.
echo [+] Wait for both servers to start (30-60 seconds)
echo [+] Then open browser: http://localhost:3000
echo [+] Login with: admin / Admin@2026
echo.
echo [i] Press Ctrl+C in each terminal to stop servers
echo.

pause
