@echo off
echo ========================================
echo   Push to GitHub - Fixed Paths
echo ========================================
echo.

cd dist

echo Checking remote...
git remote -v

echo.
echo Pushing to gh-pages...
git push -f origin gh-pages

echo.
echo ========================================
echo.
echo Done!
echo.

pause
