FROM node:18-alpine AS deps
# backend deps
WORKDIR /app/backend
COPY backend/package.json ./
RUN npm install --no-audit --no-fund

FROM node:18-alpine AS frontend
WORKDIR /app/frontend-spa
COPY frontend-spa/package.json ./
RUN npm install --no-audit --no-fund
COPY frontend-spa ./
# build only the app (skip tests)
RUN npm run build --if-present

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
# backend runtime
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY backend ./backend
# copy built SPA to be served statically by backend
COPY --from=frontend /app/frontend-spa/../frontend/dist ./frontend/dist
COPY --from=frontend /app/frontend-spa/../frontend ./frontend
WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "index.js"]


