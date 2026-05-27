# 像素风机甲对战游戏 - 技术架构文档

## 1. 系统架构

```
┌──────────────────────────────────────────────────────┐
│                    React App                         │
├──────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  GameStore  │  │  GameCanvas │  │   UI Layer  │ │
│  │  (Zustand)  │  │  (Canvas)   │  │  (React)    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
├──────────────────────────────────────────────────────┤
│                   Game Engine                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │ Physics │  │ Combat  │  │  Input  │  │ Render │ │
│  │ Engine  │  │ System  │  │ Handler │  │ Engine │ │
│  └─────────┘  └─────────┘  └─────────┘  └────────┘ │
└──────────────────────────────────────────────────────┘
```

## 2. 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| TailwindCSS | 3.x | 样式系统 |
| Zustand | 4.x | 状态管理 |
| Canvas 2D | - | 游戏渲染 |

## 3. 目录结构

```
src/
├── components/          # React组件
│   ├── Game.tsx        # 游戏主容器
│   ├── GameCanvas.tsx  # Canvas渲染层
│   ├── HUD.tsx         # 血量条UI
│   ├── StartScreen.tsx # 开始界面
│   └── EndScreen.tsx   # 结束界面
├── stores/             # Zustand状态
│   └── gameStore.ts    # 游戏状态管理
├── hooks/              # 自定义Hooks
│   ├── useGameLoop.ts  # 游戏循环
│   └── useKeyboard.ts  # 键盘输入
├── engine/             # 游戏引擎
│   ├── types.ts       # 类型定义
│   ├── Mecha.ts       # 机甲类
│   ├── CombatSystem.ts # 战斗系统
│   ├── InputHandler.ts # 输入处理
│   └── Renderer.ts    # 渲染器
├── utils/              # 工具函数
│   └── constants.ts   # 游戏常量
├── App.tsx
├── main.tsx
└── index.css
```

## 4. 核心模块

### 4.1 游戏状态 (gameStore.ts)

```typescript
interface GameState {
  gameStatus: 'idle' | 'playing' | 'ended';
  player1: MechaState;
  player2: MechaState;
  winner: 1 | 2 | null;
  score: { p1: number; p2: number };
  actions: GameActions;
}
```

### 4.2 机甲类 (Mecha.ts)

```typescript
class Mecha {
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  speed: number;
  damage: number;
  isDefending: boolean;
  isAttacking: boolean;
  attackCooldown: number;
  
  update(deltaTime: number): void;
  move(direction: Direction): void;
  attack(target: Mecha): void;
  defend(isDefending: boolean): void;
  takeDamage(amount: number): void;
}
```

### 4.3 战斗系统 (CombatSystem.ts)

```typescript
class CombatSystem {
  checkCollision(attacker: Mecha, defender: Mecha): boolean;
  calculateDamage(attacker: Mecha, defender: Mecha): number;
  applyAttack(attacker: Mecha, defender: Mecha): void;
}
```

### 4.4 渲染器 (Renderer.ts)

```typescript
class Renderer {
  ctx: CanvasRenderingContext2D;
  
  clear(): void;
  drawMecha(mecha: Mecha): void;
  drawHealthBar(mecha: Mecha, isPlayer1: boolean): void;
  drawEffects(effects: Effect[]): void;
  drawBackground(): void;
}
```

## 5. 游戏循环

```
┌─────────────────────────────────────────┐
│           requestAnimationFrame         │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         1. 处理输入 (InputHandler)        │
│            - 读取键盘状态                 │
│            - 更新机甲指令                 │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         2. 更新状态 (Game Logic)          │
│            - 移动机甲                    │
│            - 检查攻击判定                 │
│            - 更新血量                     │
│            - 检查胜负                     │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         3. 渲染画面 (Renderer)           │
│            - 清空画布                    │
│            - 绘制背景                    │
│            - 绘制机甲                    │
│            - 绘制特效                    │
│            - 绘制UI                     │
└─────────────────────────────────────────┘
                  │
                  ▼
          ┌───────────────┐
          │  等待下一帧    │
          └───────────────┘
```

## 6. 输入映射

### 玩家一（P1）
| 按键 | KeyCode | 动作 |
|------|---------|------|
| W | KeyW | 上 |
| S | KeyS | 下 |
| A | KeyA | 左 |
| D | KeyD | 右 |
| F | KeyF | 攻击 |
| G | KeyG | 防御 |

### 玩家二（P2）
| 按键 | KeyCode | 动作 |
|------|---------|------|
| ↑ | ArrowUp | 上 |
| ↓ | ArrowDown | 下 |
| ← | ArrowLeft | 左 |
| → | ArrowRight | 右 |
| J | KeyJ | 攻击 |
| K | KeyK | 防御 |
| 空格 | Space | 开始/重新开始 |

## 7. 像素艺术素材方案

### 机甲精灵
使用Canvas绘制的程序化像素艺术：

**铁拳（重装机甲）**：
- 基础形状：矩形（40x60像素）
- 颜色：深蓝#2563eb + 银灰#94a3b8
- 细节：矩形头部、方形躯干、机械手臂

**银燕（速攻机甲）**：
- 基础形状：三角形（35x50像素）
- 颜色：银白#e2e8f0 + 红色#dc2626
- 细节：尖头、流线型机身、喷射口

### 特效
- 攻击动画：白色光圈扩散
- 防御动画：蓝色能量盾
- 命中火花：橙色粒子
- 胜利光环：金色闪烁

### 背景
- 战斗平台：深色金属质感
- 网格线：青色扫描线
- 远景：星空或城市剪影

## 8. 性能优化

1. **Canvas优化**
   - 脏矩形渲染（仅重绘变化区域）
   - 离屏Canvas预渲染静态元素

2. **状态更新优化**
   - 使用Zustand的shallow比较
   - 避免不必要的重渲染

3. **输入优化**
   - 事件委托处理键盘事件
   - 状态标记替代频繁查询

## 9. 响应式设计

- Canvas自适应容器宽度（最大960px）
- 保持16:9宽高比
- 移动端不支持（需要键盘）
- 桌面端优先设计
