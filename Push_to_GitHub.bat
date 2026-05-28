@echo off
echo ========================================
echo   Update & Push to GitHub
echo ========================================
echo.

set PATH=%PATH%;C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Microsoft\VisualStudio\NodeJs

echo [Step 1/3] Adding files to git...
git add .
echo.

echo [Step 2/3] Committing changes...
git commit -m "Update project - $(date /t) $(time /t)"
echo.

echo [Step 3/3] Pushing to GitHub...
git push origin master
echo.

if errorlevel 1 (
    echo.
    echo [WARNING] Push failed!
    echo Please check your network connection to GitHub
    echo.
    echo Solutions:
    echo 1. Check internet connection
    echo 2. Use VPN if needed
    echo 3. Try again later
    echo.
)

pause
