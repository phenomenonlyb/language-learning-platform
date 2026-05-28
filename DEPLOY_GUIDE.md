# 🚀 GitHub Pages 部署指南

## 📋 准备工作

### 1. 在GitHub上创建新仓库
1. 打开 [GitHub](https://github.com/) 并登录
2. 点击右上角 **New repository** 按钮
3. 仓库名称：`language-learning-platform`（或您喜欢的名称）
4. 选择 **Public**（公开）
5. 点击 **Create repository**

### 2. 获取仓库URL
创建后，复制仓库的HTTPS或SSH URL：
- HTTPS: `https://github.com/yourusername/language-learning-platform.git`
- SSH: `git@github.com:yourusername/language-learning-platform.git`

---

## 📦 上传代码到GitHub

### 方法一：使用命令行（推荐）

打开命令行，进入项目目录：

```bash
cd C:\Users\liangyb\Desktop\Trae_demo
```

添加远程仓库（替换为您的仓库URL）：

```bash
git remote add origin https://github.com/yourusername/language-learning-platform.git
```

推送到GitHub：

```bash
git push -u origin master
```

### 方法二：使用GitHub Desktop
1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 打开GitHub Desktop
3. 点击 **Add → Add Existing Repository**
4. 选择项目目录 `C:\Users\liangyb\Desktop\Trae_demo`
5. 点击 **Publish repository**

---

## 🚀 部署到GitHub Pages

### 方法一：使用npm脚本（推荐）

确保已安装依赖：

```bash
npm install
```

运行部署命令：

```bash
npm run deploy
```

这会自动：
1. 构建项目（`npm run build`）
2. 将构建产物推送到 `gh-pages` 分支

### 方法二：手动配置GitHub Pages

1. 打开GitHub仓库页面
2. 点击 **Settings** → **Pages**
3. 在 **Source** 部分：
   - 选择 **Branch**: `gh-pages`
   - 选择 **Folder**: `/ (root)`
4. 点击 **Save**

---

## ⚙️ 重要配置说明

### 1. 更新package.json
确保 `homepage` 字段正确：

```json
{
  "homepage": "https://yourusername.github.io/language-learning-platform"
}
```

### 2. 更新vite.config.ts
确保 `base` 配置正确：

```typescript
// 对于 GitHub Pages
export default defineConfig({
  base: '/language-learning-platform/',
})
```

> ⚠️ 注意：如果您的仓库名称是 `<username>.github.io`，则 `base` 应为 `/`

### 3. 路由配置
如果使用React Router，请确保使用 `HashRouter` 或配置正确的 `basename`：

```tsx
// App.tsx
import { HashRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      {/* 您的应用 */}
    </Router>
  )
}
```

---

## 🔗 访问您的网站

部署成功后，您的网站将在以下地址可用：

```
https://yourusername.github.io/language-learning-platform
```

通常需要等待1-5分钟让GitHub Pages生效。

---

## 🛠️ 常见问题

### Q1: 部署后页面显示空白？
- 确保 `homepage` 配置正确
- 检查浏览器控制台是否有错误
- 确保使用 `HashRouter` 而非 `BrowserRouter`

### Q2: CSS/JS资源加载失败？
- 检查 `vite.config.ts` 的 `base` 配置
- 确保路径使用相对路径

### Q3: 部署命令失败？
- 确保已安装 `gh-pages`: `npm install gh-pages --save-dev`
- 确保有GitHub仓库的推送权限

---

## 📝 完整部署命令总结

```bash
# 1. 进入项目目录
cd C:\Users\liangyb\Desktop\Trae_demo

# 2. 添加远程仓库
git remote add origin https://github.com/yourusername/language-learning-platform.git

# 3. 推送到GitHub
git push -u origin master

# 4. 部署到GitHub Pages
npm run deploy
```

---

## 🎉 部署成功！

完成后，您的多语种学习平台就可以通过GitHub Pages供其他人访问了！

如果遇到任何问题，请检查：
1. GitHub仓库设置是否正确
2. `homepage` 和 `base` 配置是否匹配
3. 构建是否成功

---

**祝您部署顺利！** 🚀
