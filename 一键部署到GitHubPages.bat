@echo off
chcp 65001 >nul
echo ========================================
echo   语言星球 - 一键部署到 GitHub Pages
echo ========================================
echo.

REM 设置Node.js路径
set PATH=%PATH%;C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Microsoft\VisualStudio\NodeJs

REM 检查Node.js是否可用
node --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Node.js！
    echo 请确保已安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo [√] Node.js 已找到
echo [√] npm 已找到
echo.

echo [1/3] 正在安装依赖...
call npm install
if errorlevel 1 (
    echo [错误] 依赖安装失败！
    pause
    exit /b 1
)
echo.

echo [2/3] 正在构建项目...
call npm run build
if errorlevel 1 (
    echo [错误] 项目构建失败！
    pause
    exit /b 1
)
echo.

echo [3/3] 正在部署到 GitHub Pages...
call npm run deploy
if errorlevel 1 (
    echo [错误] 部署失败！
    echo 请检查是否已正确配置 GitHub 远程仓库
    pause
    exit /b 1
)
echo.

echo ========================================
echo.
echo   🎉 部署成功！
echo.
echo   您的网站将很快可以访问：
echo   https://phenomenonlyb.github.io/language-learning-platform
echo.
echo   （通常需要等待 1-5 分钟）
echo ========================================
echo.

pause
