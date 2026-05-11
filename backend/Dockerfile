FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN mkdir -p /app/shared && cp -r /app/../shared/* /app/shared/ 2>/dev/null || true
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]