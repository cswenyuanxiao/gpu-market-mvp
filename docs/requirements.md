# GPU Market — Consolidated Delivery Requirements (SPA + API)

This single document replaces scattered requirement/plan notes. It reflects what is DONE and what REMAINS, with a delivery-first principle:

Priority: build all pages and core functionality first, then add tests and optimizations.

## 1) Scope & Tech

- Backend: Node.js 20, Express, SQLite (better-sqlite3), JWT, bcrypt, Multer + Sharp, Helmet (CSP), rate limit, pino-http logs, Prometheus metrics, Swagger UI.
- Frontend (SPA): React 18 + Vite + TypeScript, React Router v6, Zustand, Ant Design, Tailwind CSS, React Hook Form + Zod, React Query.
- Deploy: Docker + Compose; Render (Node 20) serving SPA build from backend.

## 2) Delivery Principle

- Phase M0 (delivery): Pages + core flows complete and usable end-to-end.
- Phase M1 (hardening): Tests, performance, observability enrichments, docs polish.

## 3) User Stories (abbrev.)

- Browse/search listings with filters and pagination.
- Auth (register/login/logout) and protected actions.
- Create/edit/delete own listings with images.
- View profile and update avatar; see my listings.
- Submit “Sell to us” quote and “Contact us” message.

## 4) Current Status — M0 (Pages + Core)

Done:

- Global nav/header/drawer aligned with Ant Design; footer links present.
- Home `/` and `/everything`: list, filters (q/min/max/brand/VRAM/condition), sort mapping, pagination; empty/error states.
- Detail `/g/:id`: main image, thumbnail gallery, description, price, seller info, copy link, back to home.
- Auth: login/register forms; logout; AuthGuard redirects unauthenticated users and returns after login.
- My listings `/my`: list own items, navigate to edit, delete with confirm.
- Sell `/sell` and Edit `/edit/:id`: forms with title/price/condition/brand/VRAM/description; multiple images; create/update then redirect to detail.
- Profile `/profile` and `/profile/edit`: view display name/avatar; upload avatar (instant feedback).
- Sell to us `/sell-to-us`: form and image upload; backend persists quotes and images.
- Contact `/contact`: form; backend persists messages.
- Static pages `/about`, `/privacy`, `/terms`.
- SEO basics: page titles, `/robots.txt`, `/sitemap.xml`; static asset cache headers.
- Backend: validation with Zod, image MIME+magic checks, pixel limit, sharp resize/WebP, rate limiting, metrics (HTTP + quotes/contact), structured logs.

Remaining for M0 (ship-ready basics):

- Profile display name editing endpoint + UI wiring (currently read-only in UI).
- Minor UI consistency passes in footer styling if needed.

Out of scope for M0 (defer to M1):

- Advanced testing coverage, complex negative cases, and E2E expansion.
- Performance fine-tuning (more granular code-splitting, image gallery interactions, SSR/SEO enhancements).
- Advanced image management (drag-sort, cover selection), admin console, payments.

## 5) Acceptance Criteria (M0)

- All routes are directly navigable; core buttons/forms work and show success/error toasts.
- Unauthenticated access to protected routes (`/sell`, `/edit/:id`, `/my`, `/profile/edit`) redirects to `/login` and returns to the original route after successful login.
- Home filters/sort/pagination fetch and render results; Detail page shows key listing info; Sell/Edit create/update flows work; My listings delete works.
- Sell to us and Contact submit successfully (HTTP 201) and show success message.
- Backend enforces validation and upload safety (type, size, pixel, basic magic); rate limit on sensitive endpoints; metrics available at `/metrics`.

## 6) Phase M1 (Tests & Optimization)

- Testing: unit/integration tests for Home (sort, filters, URL sync), Details copy-link, Sell/Edit negative cases and success navigation, AuthGuard redirects; expand E2E with Playwright. Maintain existing tests; raise coverage gradually (no hard 80% gate during M0 delivery).
- Performance: refine chunking and lazy-loading where beneficial; image loading hints; reduce unused Antd usage if measurable.
- Observability: dashboards for p95/error rate; add trace hooks; structured error payloads.
- Docs: polish README (troubleshooting, dev tips), optional runbook/threat model (as separate docs if needed).

## 7) Non-Functional Baseline (already applied)

- Security: Helmet with tuned CSP; zod validation; bcrypt; JWT; CORS allowlist; rate limits on auth/quotes/contact; upload validation with MIME/ext/magic and sharp processing; static uploads under `/uploads` with cache rules.
- Observability: pino-http logs with request ids; Prometheus metrics (`/metrics`); health check at `/health`.
- Deployment: Dockerfile + docker-compose; Render build uses Node 20 and builds SPA via backend script (`render-build`/`render-start`).

## 8) API Surface (reference)

- Auth: `POST /api/register`, `POST /api/login`
- Listings: `GET /api/search`, `GET /api/gpus/:id`, `POST /api/gpus`, `PUT /api/gpus/:id`, `DELETE /api/gpus/:id`, `GET /api/my/gpus`
- Users: `GET /api/users/:id`, `POST /api/users/me/avatar`
- Quotes: `POST /api/quotes`
- Contact: `POST /api/contact`
- Ops: `GET /health`, `GET /metrics`; Docs: `/docs`

## 9) How to Run (quick)

- Dev: `cd backend && npm start` and `cd frontend-spa && npm run dev`.
- Build SPA: `cd frontend-spa && npm run build` (outputs to `frontend/dist/` for backend to serve).
- Docker: `docker compose up --build -d` (backend serves SPA statically).
