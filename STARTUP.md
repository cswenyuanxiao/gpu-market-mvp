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

### One-command helper (scripts)

Alternatively, use the helper scripts to one-click build and start/stop:

```bash
# start (build SPA → compose up)
bash scripts/dev-up.sh

# stop
bash scripts/dev-down.sh
```

### Image rebuild & cache notes

- When you change frontend or backend code, rerun `bash scripts/dev-up.sh` to trigger `docker compose up --build -d`. This rebuilds images if sources changed.
- If you suspect stale layers (e.g., `sharp` native deps cached incorrectly), force a clean rebuild:

```bash
docker compose down
docker builder prune -f
docker compose build --no-cache
docker compose up -d
```

- For Node native modules like `sharp`, ensure the Dockerfile builds them inside the image (already configured). Avoid mounting host `node_modules` into the container.

### Front-end env updates

- Dev (Vite): after editing `frontend-spa/.env` (e.g., `VITE_CONTACT_WHATSAPP`), restart dev server:

```bash
cd frontend-spa
npm run dev
```

- Docker/Production: env baked at build-time. Rebuild to apply changes:

```bash
bash scripts/dev-down.sh
docker compose build --no-cache
bash scripts/dev-up.sh
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
- Port already in use:
  - macOS: find process `lsof -i :3000 | cat` → kill `kill -9 <PID>`；或修改 `PORT` 环境变量后重启。
- Windows (WSL): ensure Docker Desktop is running and WSL integration is enabled; if ports are stuck in TIME_WAIT, restart the Docker service or change the published port.
