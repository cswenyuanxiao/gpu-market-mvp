# GPU Market — MVP

A minimal GPU buy/sell marketplace inspired by `gpused.co.uk`.

- Backend: Node.js + Express + SQLite (file uploads with multer)
- Frontend: Static HTML (Bootstrap 5)
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

- Use Node 18 LTS (recommended): `nvm install 18 && nvm use 18`
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
- `GET /health` — health check
- `GET /robots.txt` — SEO robots file
- `GET /sitemap.xml` — dynamic sitemap including recent listings

## API Docs

- Swagger UI: visit `/docs` on your deployed service (e.g., `https://gpu-market.onrender.com/docs`).

## Frontend UX (Phase 1 additions)

- Details modal: large image, seller avatar/name, price, condition, copy-link button. You can deep-link a listing with `?id=123`.
- Price range slider: dual sliders synced with min/max inputs.
- Filter chips: show active filters and allow one-click removal; "Clear all" resets filters.
- Skeletons: cards show skeleton placeholders while loading.
- Global toast: unified success/error/warning notifications; replaces `alert`.
- JWT auto-logout: any 401/403 will clear the token and prompt re-login.
- Querystring persistence: search state encoded in URL; back/refresh preserved.
- X-Request-ID surfaced in navbar for easier troubleshooting.

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

## Free Deploy (Render or Railway)

### Option A: Render (Free Web Service)

- Create a new Web Service from your GitHub repo.
- Root directory: `/` (monorepo).
- Build Command:
  - `cd backend && npm install`
- Start Command:
  - `cd backend && node index.js`
- Runtime: Node 18.
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

## SEO & Performance (Phase 7)

- Meta tags and Open Graph added to `frontend/index.html` with dynamic canonical URL.
- Backend serves `robots.txt` and `sitemap.xml` (includes homepage and up to 50 latest listings).
- Static assets served with cache headers from Express; consider CDN for production. A dynamic `sitemap.xml` and `robots.txt` are available at the root.

## Notes

- The frontend now uses a thin `apiFetch` wrapper to automatically attach JWT, surface `X-Request-ID`, and handle expired sessions.

## License

MIT
