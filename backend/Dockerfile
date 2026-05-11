FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend/ ./backend/
COPY shared/ ./shared/
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]