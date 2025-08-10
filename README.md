# 🚀 GPU Market — Full-Stack Marketplace

> A modern, production-ready GPU buy/sell marketplace built with Node.js, React, and TypeScript.

<div align="center">
  <strong>Language / 语言:</strong> 
  <a href="#english-content">English</a> | 
  <a href="#chinese-content">中文</a>
</div>

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## <a name="english-content"></a>📋 English Content

### 🎯 Overview

GPU Market is a complete e-commerce platform for buying and selling graphics cards. Built with modern web technologies, it provides a seamless experience for users to browse, search, list, and purchase GPUs with features like image uploads, user authentication, and real-time search.

### ✨ Features

- **Authentication & User Management**: JWT-based registration/login, protected routes, profile management
- **Marketplace Functionality**: Advanced filtering, search by brand/price/VRAM/condition, pagination
- **Listing Management**: Create/edit/delete listings with multiple image uploads and optimization
- **Advanced Search & Filtering**: Price range sliders, brand/condition filters, sorting options
- **Responsive Design**: Mobile-first approach, touch-friendly interactions
- **Security & Performance**: Input validation, rate limiting, CORS protection, monitoring

### 🛠️ Tech Stack

**Backend**: Node.js 20 LTS, Express.js, SQLite (better-sqlite3), JWT + bcrypt, Multer + Sharp, Zod validation, Helmet security, Prometheus metrics, Pino logging, Swagger UI

**Frontend**: React 18 + TypeScript, Vite, Ant Design + Tailwind CSS, Zustand state management, React Query, React Router v6, React Hook Form + Zod, Vitest + Testing Library

**DevOps & Tools**: Docker + Docker Compose, GitHub Actions, ESLint + Prettier + Husky, Jest + Supertest, Vitest + Playwright, Render/Railway deployment ready

### 🚀 Quick Start

#### Prerequisites
- Node.js 20 LTS
- Docker Desktop (for containerized setup)
- Git

#### Option 1: Docker Compose (Recommended)

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

#### Option 2: Local Development

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

### 📚 API Documentation

#### Core Endpoints

**Authentication**
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/users/me` - Get current user

**Listings**
- `GET /api/search` - Search listings with filters
- `GET /api/gpus/:id` - Get listing details
- `POST /api/gpus` - Create new listing
- `PUT /api/gpus/:id` - Update listing
- `DELETE /api/gpus/:id` - Delete listing

**User Management**
- `GET /api/users/:id` - Get user profile
- `POST /api/users/me/avatar` - Upload avatar

**Business Features**
- `POST /api/quotes` - Submit "Sell to us" quote
- `POST /api/contact` - Send contact message

**Operations**
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /docs` - Swagger documentation

### 🚀 Deployment

#### Render (Free Tier)

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

#### Railway

1. Connect your GitHub repository
2. Deploy as a new service
3. Set the same environment variables as Render

### 🧪 Testing

```bash
# Backend tests
cd backend
npm test              # Run all tests
npm run test:ci       # Run with coverage

# Frontend tests
cd frontend-spa
npm test              # Unit tests
npm run e2e           # End-to-end tests
```

### 🔧 Configuration

#### Environment Variables

**Backend (.env)**
```env
PORT=3000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
MAX_UPLOAD_MB=5
```

**Frontend (frontend-spa/.env)**
```env
VITE_CONTACT_WHATSAPP=your-whatsapp-number
VITE_CONTACT_EMAIL=your-email@example.com
```

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## <a name="chinese-content"></a>📋 中文内容

### 🎯 项目概述

GPU Market 是一个完整的显卡买卖电商平台。采用现代Web技术构建，为用户提供浏览、搜索、发布和购买显卡的无缝体验，包含图片上传、用户认证和实时搜索等功能。

### ✨ 功能特性

- **认证与用户管理**: 基于JWT的注册/登录、受保护路由、个人资料管理
- **市场功能**: 高级过滤、按品牌/价格/显存/状况搜索、分页
- **商品管理**: 创建/编辑/删除商品，支持多图片上传和优化
- **高级搜索与过滤**: 价格范围滑块、品牌/状况过滤器、排序选项
- **响应式设计**: 移动优先设计、触摸友好的交互
- **安全与性能**: 输入验证、速率限制、CORS保护、监控

### 🛠️ 技术栈

**后端**: Node.js 20 LTS、Express.js、SQLite (better-sqlite3)、JWT + bcrypt、Multer + Sharp、Zod验证、Helmet安全、Prometheus指标、Pino日志、Swagger UI

**前端**: React 18 + TypeScript、Vite、Ant Design + Tailwind CSS、Zustand状态管理、React Query、React Router v6、React Hook Form + Zod、Vitest + Testing Library

**DevOps与工具**: Docker + Docker Compose、GitHub Actions、ESLint + Prettier + Husky、Jest + Supertest、Vitest + Playwright、Render/Railway部署就绪

### 🚀 快速开始

#### 前置要求
- Node.js 20 LTS
- Docker Desktop (容器化设置)
- Git

#### 选项1: Docker Compose (推荐)

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

#### 选项2: 本地开发

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

### 📚 API文档

#### 核心端点

**认证**
- `POST /api/register` - 用户注册
- `POST /api/login` - 用户登录
- `GET /api/users/me` - 获取当前用户

**商品**
- `GET /api/search` - 搜索商品并过滤
- `GET /api/gpus/:id` - 获取商品详情
- `POST /api/gpus` - 创建新商品
- `PUT /api/gpus/:id` - 更新商品
- `DELETE /api/gpus/:id` - 删除商品

**用户管理**
- `GET /api/users/:id` - 获取用户资料
- `POST /api/users/me/avatar` - 上传头像

**业务功能**
- `POST /api/quotes` - 提交"卖给我们"报价
- `POST /api/contact` - 发送联系消息

**运维**
- `GET /health` - 健康检查
- `GET /metrics` - Prometheus指标
- `GET /docs` - Swagger文档

### 🚀 部署指南

#### Render (免费版)

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

#### Railway

1. 连接GitHub仓库
2. 部署为新服务
3. 设置与Render相同的环境变量

### 🧪 测试

```bash
# 后端测试
cd backend
npm test              # 运行所有测试
npm run test:ci       # 运行并生成覆盖率报告

# 前端测试
cd frontend-spa
npm test              # 单元测试
npm run e2e           # 端到端测试
```

### 🔧 配置

#### 环境变量

**后端 (.env)**
```env
PORT=3000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
MAX_UPLOAD_MB=5
```

**前端 (frontend-spa/.env)**
```env
VITE_CONTACT_WHATSAPP=your-whatsapp-number
VITE_CONTACT_EMAIL=your-email@example.com
```

### 🤝 贡献指南

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

### 📄 许可证

本项目采用MIT许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>
    <a href="https://github.com/cswenyuanxiao/gpu-market-mvp">GitHub</a> •
    <a href="http://localhost:3000/docs">API Docs</a> •
    <a href="http://localhost:3000/health">Health Check</a>
  </p>
</div>
