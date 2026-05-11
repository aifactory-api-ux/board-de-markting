FROM node:20-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./backend/package.json
RUN cd backend && npm ci
COPY backend/ ./backend/
WORKDIR /app/backend
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/index.js"]