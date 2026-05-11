FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend/ ./backend/
RUN ln -s /app/shared /app/backend/shared 2>/dev/null || true
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]