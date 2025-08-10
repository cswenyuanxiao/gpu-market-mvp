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

- Global nav/header/drawer aligned with Ant Design; footer links present and restyled to match new brand tone.
- Home `/`: simplified landing page with Welcome, Best Selling Category, Reviews and FAQs sections; removed product grid from the home route.
- New `Shop Everything` page mounted at `/everything` (`frontend-spa/src/pages/ShopEverything.tsx`) containing the full product listing, search input, sort, filters, pagination and empty/error states.
- Detail `/g/:id`: main image, thumbnail gallery, description, price, seller info, copy link (with transient "Copied!" status), back to home.
- Auth: login/register forms; logout; AuthGuard redirects unauthenticated users and returns after login. Fixed login issues caused by password field name mismatch.
- My listings `/my`: list own items, navigate to edit, delete with confirm.
- Sell `/sell` and Edit `/edit/:id`: forms with title/price/condition/brand/VRAM/description; multiple images; create/update then redirect to detail.
- Profile `/profile` and `/profile/edit`: view display name/avatar; upload avatar with immediate preview and refresh of top-nav display name (refresh JWT on display_name change).
- Sell to us `/sell-to-us`: form and image upload; backend persists quotes and images.
- Contact `/contact`: form; backend persists messages.
- Static pages `/about`, `/privacy`, `/terms` (added "Warranty & Support" content to Terms per request).
- SEO basics: page titles, `/robots.txt`, `/sitemap.xml`; static asset cache headers.
- Backend improvements:
  - Introduced `DatabaseAdapter` to support SQLite (local) and PostgreSQL (production) with a unified async `prepare().run/get/all` wrapper.
  - Added `force-seed.js` to populate production DB with ~10 sample GPU items and a few users (render hook runs it during start to ensure demo data present).
  - Fixed async DB call issues (awaiting prepared statements) that caused `login failed` and `failed to load list` errors in production.
  - Image upload hardening: MIME + magic checks, pixel limit, Sharp resizing/WebP conversion.
  - Exposed metrics at `/metrics`, health at `/health`.
- Deployment and infra:
  - `render.yaml` updated to install frontend dev deps and run `npx vite build` during deploy; start command adjusted to run `force-seed.js` before server start.
  - Docker healthcheck added for backend to use Node's fetch to check `/health`.
- Frontend/UI:
  - Replaced previous SVG logo with provided PNG (`public/logo.png`) and wired favicon; logo enlarged per spec.
  - Header redesigned to match gpused style (announcement bar, centered logo, left search, right cart, centered nav text-only links with active underline, avatar moved to top-right, faint divider under menu).
  - Global search overlay implemented (full-screen/large box, autofocus, ESC to close, suggestions and products, CTA "Search for '{keyword}'").
  - Floating WhatsApp FAB added and wired to env var (VITE_CONTACT_WHATSAPP).
  - Thumbnail selection in Details updates main image; placeholder image when no main image available.
  - Removed raffles pages and related routes/components.
  - Mobile optimizations applied (`tokens.css` updates, overflow-x fixes, responsive GpuCard adjustments) to eliminate horizontal scrolling.

Remaining for M0 (ship-ready basics):

- Final UI polish for header/menu to reach pixel parity with reference site (minor spacing/underline weight tweaks).
- Ensure all Seed images are present on production static host and image URLs are correct (some sample models still missing remote images — task: fetch and include representative images for seeded models).
- Small accessibility fixes (skip-link focus, DetailsModal focus/ESC behaviour refinement) — low risk.


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
