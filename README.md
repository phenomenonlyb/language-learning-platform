# 语言星球 - 多语种在线学习平台

一个现代化的多语种在线教育平台，支持英语、日语、韩语等主流语言学习。

## 🎯 功能特性

### 核心学习模块
- **单词记忆** - 闪卡式高效记忆，支持发音朗读
- **语法练习** - 精选语法练习题，即时反馈解析
- **口语跟读** - AI录音评测，发音打分系统
- **听力训练** - 沉浸式听力练习，提升听力能力

### 课程系统
- 分级课程体系（零基础/初级/中级/高级）
- 多语言支持（英语/日语/韩语）
- 课程进度追踪
- 个性化学习推荐

### 学习激励
- 成就徽章系统
- 学习数据统计
- 周学习趋势图
- 学习排行榜

### 社区功能
- 学习心得分享
- 问答互助
- 热门话题讨论
- 学习小组

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式框架**: TailwindCSS 3
- **状态管理**: Zustand
- **路由管理**: React Router DOM 6
- **图标库**: Lucide React

## 📦 安装与运行

### 前置要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

1. **安装依赖**
```bash
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **构建生产版本**
```bash
npm run build
```

4. **预览生产版本**
```bash
npm run preview
```

## 🎨 项目结构

```
src/
├── components/          # 可复用组件
│   └── Layout.tsx      # 主布局组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Courses.tsx      # 课程中心
│   ├── CourseDetail.tsx # 课程详情
│   ├── WordLearning.tsx # 单词记忆
│   ├── GrammarLearning.tsx # 语法练习
│   ├── SpeakingLearning.tsx # 口语跟读
│   ├── ListeningLearning.tsx # 听力训练
│   ├── Progress.tsx    # 学习进度
│   ├── Community.tsx    # 社区
│   ├── Profile.tsx      # 个人中心
│   ├── Login.tsx       # 登录
│   └── Register.tsx    # 注册
├── store/              # 状态管理
│   └── useStore.ts    # Zustand Store
├── styles/             # 样式文件
│   └── global.css     # 全局样式
├── App.tsx            # 应用主组件
├── main.tsx           # 入口文件
└── index.css          # 样式入口
```

## 🎯 快速开始

1. **克隆项目**
```bash
git clone <repository-url>
cd language-learning-platform
```

2. **安装依赖**
```bash
npm install
```

3. **启动项目**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:5173`

## 🎨 设计特点

- **渐变蓝紫主题** - 现代科技感
- **卡片式布局** - 清晰的视觉层级
- **流畅动画** - 优秀的用户体验
- **响应式设计** - 完美适配各种设备
- **深色模式** - 保护眼睛（开发中）

## 📝 主要页面

- **首页** - 语言选择、学习模块入口、推荐课程
- **课程中心** - 多语言课程浏览、筛选搜索
- **学习模块** - 单词/语法/口语/听力四大模块
- **进度追踪** - 学习数据可视化、成就展示
- **社区** - 学习交流、话题讨论
- **个人中心** - 学习档案、设置管理

## 🔧 未来规划

- [ ] 深色模式支持
- [ ] 更多语言支持（法语、德语、西班牙语）
- [ ] AI智能学习推荐
- [ ] 实时在线小组学习
- [ ] 移动端APP开发
- [ ] 后端API集成
- [ ] 用户数据持久化

## 📄 许可证

MIT License

## 👨‍💻 作者

语言星球开发团队

## 🤝 贡献

欢迎提交Issue和Pull Request！
