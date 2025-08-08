# Project Memory Log

Date: 2025-08-08

This file is a running, high-signal log to recall context between sessions. I will update it at each step with status, decisions, and next actions.

## Current Status
- Requirements documented: `docs/requirements.md`
- Architecture decisions recorded: `docs/adr/0001-tech-stack.md`
- Backend (Express + SQLite):
  - JWT auth (register/login), bcrypt password hashing
  - Listings CRUD with owner checks (create/upload image, edit, delete)
  - Search + filters + pagination (`GET /api/search`)
  - User profile read + avatar upload
  - Static uploads served at `/uploads`
  - Config via `.env` (JWT_SECRET, CORS_ORIGIN, MAX_UPLOAD_MB), `/health` endpoint
- Frontend (Bootstrap + JS):
  - Search/filters/pagination, create listing with image
  - Edit/delete (owner-only), login/register
  - Profile page + avatar upload
- CI: GitHub Actions workflow added for backend tests; Jest + Supertest skeleton in place

## Decisions (latest)
- MVP uses SQLite and local disk uploads; plan to migrate to Postgres + object storage later
- Keep frontend as static HTML + JS for simplicity; consider framework later if needed

## Next Actions
- Security: add helmet, express-rate-limit, input validation (zod) — DONE
- Observability: add pino-http logs, Prometheus metrics via prom-client and `/metrics` — DONE
- Tests: expand unit/integration tests to achieve ≥ 80% coverage on critical paths — PENDING
- Container: add `docker-compose.yml` and update `README.md` for one-command local stack — DONE

## Blockers/Risks
- Local file storage not scalable; must design storage abstraction for future migration
- Need stricter upload validation and MIME checks to reduce risk

## Local Dev Tips
- Prefer Docker Compose for a stable environment (Node 18, no native build issues). Use `docker compose` (v2) commands.
- For native local dev: use Node 18 LTS via nvm and avoid spaces in the project path.

## Timeline
- 2025-08-08: Requirements + ADR created; auth/listings/images/search/pagination implemented; CI and test skeleton added
- 2025-08-08: Added Docker Compose + README; Enhanced security (helmet/rate-limit/zod) and observability (pino-http + /metrics)
- 2025-08-08: Fixed npm install issues (pin multer to 1.4.5-lts.1); note Node 18 LTS recommended; avoid spaces in project path for native builds; README updated to `docker compose`
