FROM node:20-alpine AS builder
WORKDIR /app
COPY backend/package.json ./package.json
COPY backend/package-lock.json ./package-lock.json
RUN npm ci
COPY backend/ ./backend/
COPY shared/ ./shared/
RUN cd backend && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "backend/dist/index.js"]