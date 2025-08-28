# 您的应用官网

一个现代化的Vue.js官网项目，参考Zditor.com的设计风格，展示智能文档编辑器的功能特性。

## 🚀 特性

- ✨ 现代化设计，支持深色/浅色主题
- 📱 完全响应式设计，适配各种设备
- ⚡ 基于Vue 3 + Vite，开发体验极佳
- 🎨 使用Tailwind CSS，样式系统完善
- 🧩 组件化架构，易于维护和扩展
- 🌐 多页面路由，SEO友好
- 🎯 参考Zditor.com设计，专业美观

## 📦 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由管理**: Vue Router
- **状态管理**: Pinia
- **开发工具**: ESLint + Prettier

## 🛠️ 开发环境设置

### 前置要求

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── ui/             # 通用UI组件
│   ├── Navbar.vue      # 导航栏
│   └── Footer.vue      # 页脚
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── Features.vue    # 功能特性页
│   ├── Download.vue    # 下载页
│   └── About.vue       # 关于页
├── stores/             # 状态管理
│   └── theme.js        # 主题状态
├── router/             # 路由配置
│   └── index.js
├── style.css           # 全局样式
└── main.js             # 应用入口
```

## 🎨 设计系统

### 颜色主题

- **主色调**: 蓝色系 (primary-500: #0ea5e9)
- **辅助色**: 紫色系 (purple-600)
- **中性色**: 灰色系
- **支持深色模式**: 自动检测系统偏好

### 组件库

- `Button`: 多种样式的按钮组件
- `Card`: 卡片容器组件
- `Icon`: 统一的图标组件
- `Navbar`: 响应式导航栏
- `Footer`: 页脚组件

## 📄 页面说明

### 首页 (/)
- Hero区域：主要宣传内容
- 功能特性展示
- CTA行动召唤

### 功能特性 (/features)
- AI智能集成介绍
- 性能优化展示
- 所见即所得编辑说明

### 下载页 (/download)
- 多平台下载选项
- 系统要求说明
- 安装指南

### 关于我们 (/about)
- 公司使命愿景
- 团队介绍
- 联系方式

## 🔧 自定义配置

### 主题配置

在 `tailwind.config.js` 中可以自定义：
- 颜色主题
- 字体设置
- 动画效果
- 断点设置

### 路由配置

在 `src/router/index.js` 中添加新页面路由

### 状态管理

使用Pinia进行状态管理，当前包含：
- 主题切换状态

## 📱 响应式设计

- **移动端**: < 768px
- **平板端**: 768px - 1024px  
- **桌面端**: > 1024px

所有组件都经过响应式优化，确保在各种设备上的良好体验。

## 🌙 主题切换

支持三种主题模式：
- 浅色模式
- 深色模式
- 跟随系统

主题状态会自动保存到localStorage。

## 📝 开发指南

### 添加新页面

1. 在 `src/views/` 创建新的Vue组件
2. 在 `src/router/index.js` 添加路由配置
3. 在导航栏中添加链接

### 创建新组件

1. 在 `src/components/` 相应目录创建组件
2. 遵循现有的命名规范
3. 使用Tailwind CSS进行样式设计

### 样式规范

- 优先使用Tailwind CSS工具类
- 自定义样式放在 `src/style.css`
- 组件内样式使用scoped

## 🚀 部署

### 静态部署

构建后的文件在 `dist/` 目录，可以部署到任何静态文件服务器：

- Netlify
- Vercel
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

### 服务器部署

可以使用Nginx、Apache等Web服务器部署。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 📞 联系我们

如有问题或建议，请联系：
- 邮箱：contact@yourapp.com
- 网站：https://yourapp.com
