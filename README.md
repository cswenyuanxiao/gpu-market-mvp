# GPU Market — MVP (Consolidated Requirements Inside)

A minimal GPU buy/sell marketplace inspired by `gpused.co.uk`.

- Backend: Node.js + Express + SQLite (file uploads with multer)
- Frontend: React + Vite + TypeScript (Ant Design, React Router, React Query, Zustand)
- Auth: JWT + bcrypt

## Quick Start (Docker / Compose)

```bash
docker compose up --build
```

- Backend API: `http://localhost:3000`
- Frontend UI: `http://localhost:3000` (served statically by backend)

Stop stack:

```bash
docker compose down
```

If Docker is not installed, either install Docker Desktop for macOS, or use the Local Quick Start below.

See also: `STARTUP.md` for a one-page start guide (Compose, local dev, Render).

## Quick Start (Local)

Backend:

```bash
cd backend
npm install
npm run seed
npm start
```

Frontend:

- Open `frontend/index.html` or serve the folder (e.g. `npx serve frontend`)

Local dev notes:

- Use Node 20 LTS (recommended): `nvm install 20 && nvm use 20`
- Avoid spaces in the project path when building native modules (e.g., `~/gpu-market` instead of `~/untitled folder`)

## API Overview

- `POST /api/register` — create user
- `POST /api/login` — get JWT
- `GET /api/search` — listings with pagination/filters
- `GET /api/gpus/:id` — listing details
- `POST /api/gpus` — create listing (JWT; multipart form with image)
- `PUT /api/gpus/:id` — update listing (owner-only)
- `DELETE /api/gpus/:id` — delete listing (owner-only)
- `GET /api/users/:id` — user profile
- `POST /api/users/me/avatar` — upload avatar (JWT; multipart)
- `POST /api/quotes` — submit “Sell to us” quote (multipart; field `images` for photos)
- `POST /api/contact` — send a contact message (JSON)
- `GET /health` — health check
- `GET /robots.txt` — SEO robots file
- `GET /sitemap.xml` — dynamic sitemap including recent listings
- `GET /api/users/me` — get current user (JWT)
- `PATCH /api/users/me` — update display name (JWT; JSON)

## API Docs

- Swagger UI: visit `/docs` on your deployed service (e.g., `https://gpu-market.onrender.com/docs`).

### Example: Update display name

Requires Authorization header: `Authorization: Bearer <token>`

Request:

```http
PATCH /api/users/me HTTP/1.1
Content-Type: application/json
Authorization: Bearer <token>

{ "display_name": "Alice" }
```

Response (200):

```json
{
  "user": {
    "id": 1,
    "username": "alice",
    "display_name": "Alice",
    "avatar_path": "/uploads/abc.webp"
  },
  "token": "<new_jwt_token>"
}
```

### curl quickstart

```bash
# 1) Login to get JWT
curl -sS -X POST http://localhost:3000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"demo","password":"demo"}' | jq -r .token > token.txt

# 2) Use token to get current user
curl -sS http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $(cat token.txt)" | jq

# 3) Update display name
curl -sS -X PATCH http://localhost:3000/api/users/me \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $(cat token.txt)" \
  -d '{"display_name":"Alice"}' | jq

# 4) Create a listing (multipart, example without image)
curl -sS -X POST http://localhost:3000/api/gpus \
  -H "Authorization: Bearer $(cat token.txt)" \
  -F title='RTX 3080' -F price='2999' -F condition='Used' -F brand='NVIDIA' -F vram_gb='10' | jq
```

## Authentication (Bearer token)

- Obtain token: `POST /api/login` returns `{ token }`.
- Use token: attach header `Authorization: Bearer <token>` to protected endpoints (e.g., `POST /api/gpus`, `GET /api/my/gpus`, `PATCH /api/users/me`).
- Refresh token: `PATCH /api/users/me` returns a refreshed token containing updated `display_name`. Frontend会用新 token 覆盖旧 token 以便导航栏等位置即时更新。

## Frontend UX (Phase 1 additions)

- Details modal: large image, seller avatar/name, price, condition, copy-link button. You can deep-link a listing with `?id=123`.
- Price range slider: dual sliders synced with min/max inputs.
- Filter chips: show active filters and allow one-click removal; "Clear all" resets filters.
- Skeletons: cards show skeleton placeholders while loading.
- Global toast: unified success/error/warning notifications; replaces `alert`.
- JWT auto-logout: any 401/403 will clear the token and prompt re-login.
- Querystring persistence: search state encoded in URL; back/refresh preserved.
- X-Request-ID surfaced in navbar for easier troubleshooting.

### New pages

- Sell to us: `/sell-to-us` — Fields: name, email, phone, brand (NVIDIA/AMD), model, grade (A/B/C), warranty, accessories, expected price, note, images. Submits to `POST /api/quotes`.
- Contact: `/contact` — Fields: name, email, message, consent. Submits to `POST /api/contact`.

### Profile

- Edit Profile: `/profile/edit` — Update display name and avatar. Display name uses `PATCH /api/users/me` (returns refreshed JWT for immediate navbar update); avatar uses `POST /api/users/me/avatar`.

## Env Vars

See `.env.example` (use `.env` in production):

- `PORT` (default 3000)
- `JWT_SECRET` (required in production)
- `CORS_ORIGIN` (default allow all)
- `MAX_UPLOAD_MB` (default 5)
- `MAX_IMAGE_PIXELS` (default 25,000,000) — reject oversized images by pixel count
- `IMAGE_MAX_WIDTH` (default 1920) — server resize width for full image
- `THUMB_WIDTH` (default 400) — server resize width for thumbnail
- `DB_PATH` (default `./backend/data.db` when running locally)

## Development

- Tests: `cd backend && npm test`
- CI: GitHub Actions runs on push/PR

### Frontend (React + Vite + TS) — Phase 11

- Dev: `cd frontend-spa && npm install && npm run dev` (proxy 到 `http://localhost:3000`)
- Build: `npm run build`（产出到 `frontend/dist/`，由后端静态托管）

## Free Deploy (Render or Railway)

### Option A: Render (Free Web Service)

- Create a new Web Service from your GitHub repo.
- Root directory: `/` (monorepo).
- Build Command:
  - `cd backend && npm run render-build`
- Start Command:
  - `cd backend && npm run render-start`
- Runtime: Node 20 (set Render env `NODE_VERSION=20`).
- Environment variables:
  - `JWT_SECRET` (set a strong random value)
  - `CORS_ORIGIN` (e.g. your frontend URL or `*` for quick demo)
  - `MAX_UPLOAD_MB` (optional, default 5)
  - `MAX_IMAGE_PIXELS` (optional)
  - `IMAGE_MAX_WIDTH`, `THUMB_WIDTH` (optional)
- Static frontend: not required; backend already serves `frontend/`.

#### One-click with Blueprint

This repo includes `render.yaml`. On Render, click "New +" → "Blueprint" → connect this repo. It will provision a free Node Web Service using the blueprint with healthcheck `/health`, Node 18, and sane defaults. After deploy, set `CORS_ORIGIN` to your Render URL for stricter CORS.

Deploy button (manually copy into your org if desired):

`https://render.com/deploy?repo=<your_repo_url>`

### Option B: Railway (Free Tier)

- Create a new project → Service → Deploy from GitHub.
- Variables same as above.
- Start command: `cd backend && node index.js`

### One-Click alternative (Railway Template)

- Create a `railway.json` template and connect; for now manual setup above is enough for demo.

Note: This repo already serves `frontend/` statically from the backend if present on the same server. Deploying just the backend will work for both API and UI.

## Requirements

For the up-to-date, consolidated delivery requirements covering scope, status (what’s done vs remaining), acceptance for delivery-first, and M1 hardening plan, see `docs/requirements.md`.

## SEO & Performance (Phase 7)

- Meta tags and Open Graph added to `frontend/index.html` with dynamic canonical URL. Added `keywords` and `theme-color`.
- Backend serves `robots.txt` and `sitemap.xml` (includes homepage and up to 50 latest listings).
- Static assets served with cache headers from Express (immutable year-long for non-HTML, no-cache for HTML). Consider a CDN for production.

## Observability (Prometheus)

- Metrics endpoint: `GET /metrics` (Prometheus text format)
- Built-in metrics:
  - HTTP: `http_request_duration_seconds`, `http_requests_total`, `http_responses_total`, `http_responses_4xx_total`, `http_responses_5xx_total`
  - Upload guard: `upload_failures_total`
  - Business:
    - Quotes: `quotes_created_total`, `quotes_failed_total{reason="invalid_image|server"}`
    - Contact: `contact_messages_created_total`, `contact_messages_failed_total{reason="server"}`

Example Prometheus scrape config (snippet):

```
scrape_configs:
  - job_name: 'gpu-market'
    metrics_path: /metrics
    static_configs:
      - targets: ['localhost:3000']
```

## Notes

- The frontend now uses a thin `apiFetch` wrapper to automatically attach JWT, surface `X-Request-ID`, and handle expired sessions.

## License

MIT

## Deployment (Phase 10)

### Production Docker (single container)

Build and run with production defaults:

```bash
docker build -t gpu-market .
docker run --rm -p 3000:3000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=change_me \
  -e CORS_ORIGIN="http://localhost:3000" \
  gpu-market
```

### docker-compose with env overrides

Create a `.env` with your values (JWT_SECRET, CORS_ORIGIN, etc.), then:

```bash
docker compose up --build
```

The compose file reads environment variables with sensible defaults.
