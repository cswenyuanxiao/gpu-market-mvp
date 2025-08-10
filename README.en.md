# 🚀 GPU Market — Full-Stack Marketplace

> A modern, production-ready GPU buy/sell marketplace built with Node.js, React, and TypeScript.

## Overview

GPU Market is a complete e-commerce platform for buying and selling graphics cards. Built with modern web technologies, it provides a seamless experience for users to browse, search, list, and purchase GPUs with features like image uploads, user authentication, and real-time search.

## Quick Start

### Docker (recommended)

```bash
# Build SPA and start stack
cd frontend-spa && npm install && npm run build && cd ..
docker compose up --build -d

# Stop
docker compose down
```

### Local (dev)

Backend:

```bash
cd backend
npm install
npm run seed
npm start
```

Frontend (Vite):

```bash
cd frontend-spa
npm install
npm run dev
```

## API

- `POST /api/register`
- `POST /api/login`
- `GET /api/search`
- `GET /api/gpus/:id`
- `POST /api/gpus`
- `PUT /api/gpus/:id`
- `DELETE /api/gpus/:id`
- `POST /api/contact`
- `POST /api/quotes`
- `GET /health`
- `GET /metrics`
- `GET /docs`

## Contributing

PRs welcome — follow code style, add tests, and include documentation updates.

---

For the full developer README with tests, deployment, and deep-dive docs, please see the repository files and the `docs/` folder.
