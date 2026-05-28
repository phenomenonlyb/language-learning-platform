@echo off
echo ========================================
echo   Language Planet - Deploy to GitHub Pages
echo ========================================
echo.

set PATH=%PATH%;C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Microsoft\VisualStudio\NodeJs

node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
echo [OK] npm found
echo.

echo [Step 1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo.

echo [Step 2/3] Building project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo.

echo [Step 3/3] Deploying to GitHub Pages...
call npm run deploy
if errorlevel 1 (
    echo [ERROR] Deploy failed!
    echo Please check GitHub remote repository configuration
    pause
    exit /b 1
)
echo.

echo ========================================
echo.
echo   SUCCESS! Deployment complete!
echo.
echo   Your website will be available at:
echo   https://phenomenonlyb.github.io/language-learning-platform
echo.
echo   (Usually takes 1-5 minutes to be accessible)
echo ========================================
echo.

pause
