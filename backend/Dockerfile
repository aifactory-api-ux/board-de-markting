FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY backend/ ./backend/
COPY shared/ ./shared/
RUN cd backend && npm run build
EXPOSE 4000
CMD ["node", "backend/dist/index.js"]