@echo off
echo ========================================
echo   语言星球 - 多语种在线学习平台
echo ========================================
echo.

echo 正在启动项目...
echo.

REM 设置Node.js路径（根据您的安装位置调整）
set PATH=%PATH%;C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Microsoft\VisualStudio\NodeJs

REM 检查Node.js是否可用
node --version
if errorlevel 1 (
    echo Node.js 未找到，请确保已安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo 正在安装依赖...
npm install --ignore-scripts

if errorlevel 1 (
    echo 依赖安装失败
    pause
    exit /b 1
)

echo.
echo 依赖安装完成！
echo.
echo 正在启动开发服务器...
echo.
npm run dev

pause
