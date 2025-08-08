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
- Frontend UI: `http://localhost:8080`

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

## Env Vars
See `.env.example` (use `.env` in production):

- `PORT` (default 3000)
- `JWT_SECRET` (required in production)
- `CORS_ORIGIN` (default allow all)
- `MAX_UPLOAD_MB` (default 5)

## Development
- Tests: `cd backend && npm test`
- CI: GitHub Actions runs on push/PR

## License
MIT
