# 🚀 GPU Market — Full-Stack Marketplace

> A modern, production-ready GPU buy/sell marketplace built with Node.js, React, and TypeScript.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

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
