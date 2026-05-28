# 📝 Git 操作指南

## ✅ 已完成的工作

1. ✅ Git 仓库已初始化
2. ✅ 代码已提交到本地仓库
3. ✅ GitHub Pages 已成功部署
4. ⚠️ 代码待推送到 GitHub（网络问题）

---

## 🔧 后续 Git 操作

### 当网络恢复时，执行以下命令：

```bash
cd C:\Users\liangyb\Desktop\Trae_demo

# 推送代码到 GitHub
git push origin master
```

### 后续更新代码流程：

```bash
# 1. 修改代码后，添加更改
git add .

# 2. 提交更改
git commit -m "Your commit message here"

# 3. 推送到 GitHub
git push origin master

# 4. 重新部署到 GitHub Pages
npm run deploy
```

---

## 🌐 GitHub 仓库信息

- **仓库地址**: https://github.com/phenomenonlyb/language-learning-platform
- **网站地址**: https://phenomenonlyb.github.io/language-learning-platform

---

## 📝 常用 Git 命令

```bash
# 查看当前状态
git status

# 查看提交历史
git log

# 查看远程仓库
git remote -v

# 拉取最新代码
git pull origin master

# 创建新分支
git checkout -b feature-name

# 切换分支
git checkout master

# 合并分支
git merge feature-name
```

---

## 🎯 推荐的 Git 工作流程

### 日常开发流程：

1. **开始新功能前**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **开发完成后**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

3. **合并到主分支**
   ```bash
   git checkout master
   git merge feature/new-feature
   git push origin master
   npm run deploy
   ```

---

## 🔐 GitHub 协作（可选）

### 添加协作者：

1. 打开 GitHub 仓库
2. Settings → Manage access → Invite a collaborator
3. 输入协作者的 GitHub 用户名

### Fork 项目：

1. 点击 GitHub 仓库的 "Fork" 按钮
2. 在你的账户下创建副本
3. 克隆你的 Fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/language-learning-platform.git
   ```

---

## 💡 提示

- 📌 经常提交代码，避免丢失工作
- 📌 提交信息要清晰，描述做了什么
- 📌 每次大功能完成后，记得 `npm run deploy`
- 📌 保持 `master` 分支的稳定性

---

## 📚 学习资源

- Git 基础: https://git-scm.com/doc
- GitHub 教程: https://guides.github.com/
- Git 速查表: https://training.github.com/
