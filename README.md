# 🚀 GPU Market — Full-Stack Marketplace

> A modern, production-ready GPU buy/sell marketplace built with Node.js, React, and TypeScript.

<div align="center">
  <div style="margin: 20px 0;">
    <button onclick="switchLanguage('en')" id="en-btn" style="background: #007bff; color: white; border: none; padding: 8px 16px; margin: 0 5px; border-radius: 4px; cursor: pointer; font-weight: bold;">English</button>
    <button onclick="switchLanguage('zh')" id="zh-btn" style="background: #f8f9fa; color: #007bff; border: 1px solid #007bff; padding: 8px 16px; margin: 0 5px; border-radius: 4px; cursor: pointer;">中文</button>
  </div>
</div>

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<div id="en-content">
## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## 🎯 Overview

GPU Market is a complete e-commerce platform for buying and selling graphics cards. Built with modern web technologies, it provides a seamless experience for users to browse, search, list, and purchase GPUs with features like image uploads, user authentication, and real-time search.

### Key Highlights

- **Full-Stack Solution**: Complete backend API + React SPA frontend
- **Production Ready**: Security, monitoring, and deployment configurations included
- **Modern Architecture**: TypeScript, React 18, Node.js 20, with best practices
- **Developer Friendly**: Comprehensive testing, linting, and development tools

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with JWT
- Protected routes and role-based access
- Profile management with avatar uploads
- Session management and auto-logout

### 🛍️ Marketplace Functionality
- Browse GPU listings with advanced filtering
- Search by brand, price range, VRAM, condition
- Pagination and sorting options
- Detailed product pages with image galleries

### 📝 Listing Management
- Create, edit, and delete listings
- Multiple image uploads with automatic optimization
- Rich form validation and error handling
- Real-time preview and editing

### 🔍 Advanced Search & Filtering
- Price range sliders
- Brand and condition filters
- VRAM capacity filtering
- Sort by price, date, condition

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive Web App features

### 🛡️ Security & Performance
- Input validation and sanitization
- Rate limiting and CORS protection
- Image upload security
- Performance monitoring and metrics

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Sharp
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Monitoring**: Prometheus metrics, Pino logging
- **Documentation**: Swagger UI

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design + Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Testing Library

### DevOps & Tools
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier + Husky
- **Testing**: Jest + Supertest (backend), Vitest + Playwright (frontend)
- **Deployment**: Render, Railway ready

## 🚀 Quick Start

### Prerequisites
- Node.js 20 LTS
- Docker Desktop (for containerized setup)
- Git

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/cswenyuanxiao/gpu-market-mvp.git
cd gpu-market-mvp

# One-command startup
bash scripts/dev-up.sh

# Access the application
# Frontend: http://localhost:3000
# API Docs: http://localhost:3000/docs
# Health Check: http://localhost:3000/health
# Metrics: http://localhost:3000/metrics

# Stop the application
bash scripts/dev-down.sh
```

### Option 2: Local Development

```bash
# Backend setup
cd backend
npm install
npm run seed
npm start

# Frontend setup (new terminal)
cd frontend-spa
npm install
npm run dev
```

## 🏗️ Development

### Project Structure

```
gpu-market-mvp/
├── backend/                 # Node.js API server
│   ├── app.js              # Main Express application
│   ├── database.js         # Database setup and queries
│   ├── seed.js             # Database seeding
│   └── tests/              # Backend tests
├── frontend-spa/           # React SPA
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and helpers
│   │   └── store/          # State management
│   └── tests/              # Frontend tests
├── docs/                   # Documentation
├── scripts/                # Development scripts
└── docker-compose.yml      # Docker configuration
```

### Available Scripts

#### Root Level
```bash
npm run lint          # Lint all JavaScript files
npm run format        # Format code with Prettier
```

#### Backend
```bash
cd backend
npm start             # Start development server
npm run seed          # Seed database with sample data
npm test              # Run tests
npm run test:ci       # Run tests with coverage
```

#### Frontend
```bash
cd frontend-spa
npm run dev           # Start development server
npm run build         # Build for production
npm test              # Run tests
npm run e2e           # Run end-to-end tests
```

### Environment Variables

Create `.env` files in respective directories:

#### Backend (.env)
```env
PORT=3000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
MAX_UPLOAD_MB=5
```

#### Frontend (frontend-spa/.env)
```env
VITE_CONTACT_WHATSAPP=your-whatsapp-number
VITE_CONTACT_EMAIL=your-email@example.com
```

## 📚 API Documentation

### Core Endpoints

#### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/users/me` - Get current user

#### Listings
- `GET /api/search` - Search listings with filters
- `GET /api/gpus/:id` - Get listing details
- `POST /api/gpus` - Create new listing
- `PUT /api/gpus/:id` - Update listing
- `DELETE /api/gpus/:id` - Delete listing

#### User Management
- `GET /api/users/:id` - Get user profile
- `POST /api/users/me/avatar` - Upload avatar

#### Business Features
- `POST /api/quotes` - Submit "Sell to us" quote
- `POST /api/contact` - Send contact message

#### Operations
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /docs` - Swagger documentation

### Interactive API Docs

Visit `http://localhost:3000/docs` for interactive Swagger documentation when running locally.

## 🚀 Deployment

### Render (Free Tier)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure build settings:
   - **Build Command**: `cd backend && npm run render-build`
   - **Start Command**: `cd backend && npm run render-start`
   - **Runtime**: Node 20

4. Set environment variables:
   - `JWT_SECRET` (required)
   - `CORS_ORIGIN` (your Render URL)
   - `NODE_VERSION=20`

### Railway

1. Connect your GitHub repository
2. Deploy as a new service
3. Set the same environment variables as Render

### Docker Production

```bash
# Build and run
docker build -t gpu-market .
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret \
  -e CORS_ORIGIN=https://yourdomain.com \
  gpu-market
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:ci       # Run with coverage
```

### Frontend Tests
```bash
cd frontend-spa
npm test              # Unit tests
npm run e2e           # End-to-end tests
```

### Test Coverage
- Backend: Jest with 80% coverage threshold
- Frontend: Vitest with comprehensive component testing
- E2E: Playwright for critical user flows

## 🔧 Configuration

### Database
- **Development**: SQLite (file-based)
- **Production**: PostgreSQL (configurable)
- **Migrations**: Automatic schema creation
- **Seeding**: Sample data included

### Security
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt
- **Input Validation**: Zod schemas
- **Rate Limiting**: Express rate limit
- **CORS**: Configurable origins
- **Helmet**: Security headers

### File Uploads
- **Supported Formats**: JPEG, PNG, WebP
- **Size Limits**: Configurable (default 5MB)
- **Processing**: Automatic resizing with Sharp
- **Storage**: Local filesystem (configurable for cloud)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Use conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/cswenyuanxiao/gpu-market-mvp/issues)
- **Documentation**: Check the `/docs` folder
- **API Docs**: Available at `/docs` when running locally

## 🗺️ Roadmap

### Phase M0 (Current)
- ✅ Core marketplace functionality
- ✅ User authentication and profiles
- ✅ Listing management
- ✅ Search and filtering
- ✅ Image uploads
- ✅ Responsive design

### Phase M1 (Next)
- 🔄 Enhanced testing coverage
- 🔄 Performance optimizations
- 🔄 Advanced image management
- 🔄 Admin dashboard
- 🔄 Payment integration
- 🔄 Real-time notifications

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>
    <a href="https://github.com/cswenyuanxiao/gpu-market-mvp">GitHub</a> •
    <a href="http://localhost:3000/docs">API Docs</a> •
    <a href="http://localhost:3000/health">Health Check</a>
  </p>
</div>
</div>

<div id="zh-content" style="display: none;">
## 📋 目录

- [项目概述](#-项目概述)
- [功能特性](#-功能特性)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [开发指南](#-开发指南)
- [API文档](#-api文档)
- [部署指南](#-部署指南)
- [项目结构](#-项目结构)
- [贡献指南](#-贡献指南)

## 🎯 项目概述

GPU Market 是一个完整的显卡买卖电商平台。采用现代Web技术构建，为用户提供浏览、搜索、发布和购买显卡的无缝体验，包含图片上传、用户认证和实时搜索等功能。

### 核心亮点

- **全栈解决方案**: 完整的后端API + React SPA前端
- **生产就绪**: 包含安全、监控和部署配置
- **现代架构**: TypeScript、React 18、Node.js 20，遵循最佳实践
- **开发者友好**: 全面的测试、代码检查和开发工具

## ✨ 功能特性

### 🔐 认证与用户管理
- 基于JWT的用户注册和登录
- 受保护路由和基于角色的访问控制
- 个人资料管理和头像上传
- 会话管理和自动登出

### 🛍️ 市场功能
- 浏览显卡列表，支持高级过滤
- 按品牌、价格范围、显存、状况搜索
- 分页和排序选项
- 详细产品页面和图片画廊

### 📝 商品管理
- 创建、编辑和删除商品
- 多图片上传，自动优化
- 丰富的表单验证和错误处理
- 实时预览和编辑

### 🔍 高级搜索与过滤
- 价格范围滑块
- 品牌和状况过滤器
- 显存容量过滤
- 按价格、日期、状况排序

### 📱 响应式设计
- 移动优先设计
- 适配所有屏幕尺寸
- 触摸友好的交互
- 渐进式Web应用功能

### 🛡️ 安全与性能
- 输入验证和清理
- 速率限制和CORS保护
- 图片上传安全
- 性能监控和指标

## 🛠️ 技术栈

### 后端
- **运行时**: Node.js 20 LTS
- **框架**: Express.js
- **数据库**: SQLite (better-sqlite3)
- **认证**: JWT + bcrypt
- **文件上传**: Multer + Sharp
- **验证**: Zod
- **安全**: Helmet, CORS, 速率限制
- **监控**: Prometheus指标, Pino日志
- **文档**: Swagger UI

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI库**: Ant Design + Tailwind CSS
- **状态管理**: Zustand
- **数据获取**: React Query (TanStack Query)
- **路由**: React Router v6
- **表单**: React Hook Form + Zod
- **测试**: Vitest + Testing Library

### DevOps与工具
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **代码质量**: ESLint + Prettier + Husky
- **测试**: Jest + Supertest (后端), Vitest + Playwright (前端)
- **部署**: Render, Railway就绪

## 🚀 快速开始

### 前置要求
- Node.js 20 LTS
- Docker Desktop (容器化设置)
- Git

### 选项1: Docker Compose (推荐)

```bash
# 克隆仓库
git clone https://github.com/cswenyuanxiao/gpu-market-mvp.git
cd gpu-market-mvp

# 一键启动
bash scripts/dev-up.sh

# 访问应用
# 前端: http://localhost:3000
# API文档: http://localhost:3000/docs
# 健康检查: http://localhost:3000/health
# 指标: http://localhost:3000/metrics

# 停止应用
bash scripts/dev-down.sh
```

### 选项2: 本地开发

```bash
# 后端设置
cd backend
npm install
npm run seed
npm start

# 前端设置 (新终端)
cd frontend-spa
npm install
npm run dev
```

## 🏗️ 开发指南

### 项目结构

```
gpu-market-mvp/
├── backend/                 # Node.js API服务器
│   ├── app.js              # 主Express应用
│   ├── database.js         # 数据库设置和查询
│   ├── seed.js             # 数据库种子数据
│   └── tests/              # 后端测试
├── frontend-spa/           # React SPA
│   ├── src/
│   │   ├── components/     # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── lib/            # 工具和助手
│   │   └── store/          # 状态管理
│   └── tests/              # 前端测试
├── docs/                   # 文档
├── scripts/                # 开发脚本
└── docker-compose.yml      # Docker配置
```

### 可用脚本

#### 根目录
```bash
npm run lint          # 检查所有JavaScript文件
npm run format        # 使用Prettier格式化代码
```

#### 后端
```bash
cd backend
npm start             # 启动开发服务器
npm run seed          # 种子数据库示例数据
npm test              # 运行测试
npm run test:ci       # 运行测试并生成覆盖率报告
```

#### 前端
```bash
cd frontend-spa
npm run dev           # 启动开发服务器
npm run build         # 构建生产版本
npm test              # 运行测试
npm run e2e           # 运行端到端测试
```

### 环境变量

在相应目录创建 `.env` 文件:

#### 后端 (.env)
```env
PORT=3000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
MAX_UPLOAD_MB=5
```

#### 前端 (frontend-spa/.env)
```env
VITE_CONTACT_WHATSAPP=your-whatsapp-number
VITE_CONTACT_EMAIL=your-email@example.com
```

## 📚 API文档

### 核心端点

#### 认证
- `POST /api/register` - 用户注册
- `POST /api/login` - 用户登录
- `GET /api/users/me` - 获取当前用户

#### 商品
- `GET /api/search` - 搜索商品并过滤
- `GET /api/gpus/:id` - 获取商品详情
- `POST /api/gpus` - 创建新商品
- `PUT /api/gpus/:id` - 更新商品
- `DELETE /api/gpus/:id` - 删除商品

#### 用户管理
- `GET /api/users/:id` - 获取用户资料
- `POST /api/users/me/avatar` - 上传头像

#### 业务功能
- `POST /api/quotes` - 提交"卖给我们"报价
- `POST /api/contact` - 发送联系消息

#### 运维
- `GET /health` - 健康检查
- `GET /metrics` - Prometheus指标
- `GET /docs` - Swagger文档

### 交互式API文档

本地运行时访问 `http://localhost:3000/docs` 查看交互式Swagger文档。

## 🚀 部署指南

### Render (免费版)

1. 将GitHub仓库连接到Render
2. 创建新的Web服务
3. 配置构建设置:
   - **构建命令**: `cd backend && npm run render-build`
   - **启动命令**: `cd backend && npm run render-start`
   - **运行时**: Node 20

4. 设置环境变量:
   - `JWT_SECRET` (必需)
   - `CORS_ORIGIN` (你的Render URL)
   - `NODE_VERSION=20`

### Railway

1. 连接GitHub仓库
2. 部署为新服务
3. 设置与Render相同的环境变量

### Docker生产环境

```bash
# 构建并运行
docker build -t gpu-market .
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret \
  -e CORS_ORIGIN=https://yourdomain.com \
  gpu-market
```

## 🧪 测试

### 后端测试
```bash
cd backend
npm test              # 运行所有测试
npm run test:ci       # 运行并生成覆盖率报告
```

### 前端测试
```bash
cd frontend-spa
npm test              # 单元测试
npm run e2e           # 端到端测试
```

### 测试覆盖率
- 后端: Jest，80%覆盖率阈值
- 前端: Vitest，全面的组件测试
- E2E: Playwright，关键用户流程

## 🔧 配置

### 数据库
- **开发**: SQLite (基于文件)
- **生产**: PostgreSQL (可配置)
- **迁移**: 自动模式创建
- **种子数据**: 包含示例数据

### 安全
- **认证**: JWT令牌
- **密码哈希**: bcrypt
- **输入验证**: Zod模式
- **速率限制**: Express速率限制
- **CORS**: 可配置源
- **Helmet**: 安全头

### 文件上传
- **支持格式**: JPEG, PNG, WebP
- **大小限制**: 可配置 (默认5MB)
- **处理**: 使用Sharp自动调整大小
- **存储**: 本地文件系统 (可配置为云存储)

## 🤝 贡献指南

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

### 开发指南

- 遵循现有代码风格 (ESLint + Prettier)
- 为新功能编写测试
- 根据需要更新文档
- 使用约定式提交

## 📄 许可证

本项目采用MIT许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🆘 支持

- **问题**: [GitHub Issues](https://github.com/cswenyuanxiao/gpu-market-mvp/issues)
- **文档**: 查看 `/docs` 文件夹
- **API文档**: 本地运行时在 `/docs` 可用

## 🗺️ 路线图

### 阶段M0 (当前)
- ✅ 核心市场功能
- ✅ 用户认证和资料
- ✅ 商品管理
- ✅ 搜索和过滤
- ✅ 图片上传
- ✅ 响应式设计

### 阶段M1 (下一步)
- 🔄 增强测试覆盖率
- 🔄 性能优化
- 🔄 高级图片管理
- 🔄 管理仪表板
- 🔄 支付集成
- 🔄 实时通知

---

<div align="center">
  <p>使用现代Web技术构建 ❤️</p>
  <p>
    <a href="https://github.com/cswenyuanxiao/gpu-market-mvp">GitHub</a> •
    <a href="http://localhost:3000/docs">API文档</a> •
    <a href="http://localhost:3000/health">健康检查</a>
  </p>
</div>
</div>

<script>
function switchLanguage(lang) {
  const enContent = document.getElementById('en-content');
  const zhContent = document.getElementById('zh-content');
  const enBtn = document.getElementById('en-btn');
  const zhBtn = document.getElementById('zh-btn');
  
  if (lang === 'en') {
    enContent.style.display = 'block';
    zhContent.style.display = 'none';
    enBtn.style.background = '#007bff';
    enBtn.style.color = 'white';
    zhBtn.style.background = '#f8f9fa';
    zhBtn.style.color = '#007bff';
  } else {
    enContent.style.display = 'none';
    zhContent.style.display = 'block';
    enBtn.style.background = '#f8f9fa';
    enBtn.style.color = '#007bff';
    zhBtn.style.background = '#007bff';
    zhBtn.style.color = 'white';
  }
}
</script>
