FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY backend/ ./backend/
WORKDIR /app/backend
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package*.json ./
RUN npm ci --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]