# Start Guide (One-Command Run)

This project includes both backend (Express + SQLite) and frontend SPA (React + Vite + TS). The backend serves the built SPA statically.

## Option A — Docker Compose (recommended)

Prerequisites: Docker Desktop 4.x (Compose v2), internet access.

Steps:

1. From repo root, build the SPA and bring up the stack:

```bash
# Build SPA → outputs to frontend/dist for backend to serve
cd frontend-spa && npm install && npm run build && cd ..

# Build and run backend (serves API and SPA)
docker compose up --build -d
```

2. Access:

- API and UI: `http://localhost:3000`
- Health: `http://localhost:3000/health`
- Docs (Swagger): `http://localhost:3000/docs`
- Metrics (Prometheus): `http://localhost:3000/metrics`

3. Stop:

```bash
docker compose down
```

Environment variables (optional, with defaults in compose):

- `JWT_SECRET` (set a strong value for non-local)
- `CORS_ORIGIN` (comma-separated allowlist; default `http://localhost:3000,http://localhost:5173`)
- `MAX_UPLOAD_MB` (default 5)

Note: The backend starts with `node seed.js && node index.js` to seed initial data.

## Option B — Local Dev (two terminals)

Terminal 1 (backend):

```bash
cd backend
npm install
npm run seed
npm start
# Backend on http://localhost:3000
```

Terminal 2 (frontend dev server):

```bash
cd frontend-spa
npm install
npm run dev
# SPA on http://localhost:5173 (proxy to backend for /api, /uploads)
```

## Render Deploy (free-tier)

- Build Command: `cd backend && npm run render-build`
- Start Command: `cd backend && npm run render-start`
- Runtime: Node 20 (`NODE_VERSION=20`)
- Required env:
  - `JWT_SECRET` (strong random)
  - `CORS_ORIGIN` (e.g. your Render URL)

If your deployment shows an old UI, clear build cache on Render and redeploy. Use hard refresh (Cmd/Ctrl+Shift+R) to bypass browser cache.

## Troubleshooting

- Blank page after deploy: force refresh or use incognito; ensure SPA was rebuilt and copied to `frontend/dist`.
- Native build errors locally (better-sqlite3): use Node 20 LTS or run via Docker Compose.
- Image uploads rejected: only `jpeg/png/webp` allowed; size ≤ `MAX_UPLOAD_MB`; invalid magic bytes are rejected.
