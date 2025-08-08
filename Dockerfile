FROM node:18-alpine AS deps
WORKDIR /app/backend
# Install all deps (dev included) for development/test image
COPY backend/package.json ./
RUN npm install --no-audit --no-fund

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
# Copy backend source and pre-installed node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY backend ./backend
# Copy frontend so backend can serve it statically
COPY frontend ./frontend
WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "index.js"]


