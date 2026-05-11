FROM node:20-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend/ ./backend/
COPY shared/ ./shared/
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/shared ./shared
COPY backend/package*.json ./
WORKDIR /app
RUN npm ci --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]