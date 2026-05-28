@echo off
echo ========================================
echo   GitHub连接问题诊断与解决工具
echo ========================================
echo.

echo [1/6] 检查网络连接...
ping -n 4 github.com
echo.

echo [2/6] 检查Git配置...
git config --global -l
echo.

echo [3/6] 当前远程仓库配置...
git remote -v
echo.

echo ========================================
echo.
echo 如果网络连接失败，请尝试以下解决方案：
echo.
echo 方案A: 使用GitHub镜像站
echo 方案B: 配置代理
echo 方案C: 使用SSH而不是HTTPS
echo 方案D: 使用Gitee替代
echo.
echo 详细说明请查看 GITHUB_CONNECTION_FIX.md
echo.
pause
