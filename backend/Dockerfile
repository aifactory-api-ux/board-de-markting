FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN mkdir -p /app/backend && mkdir -p /app/shared && \
    cp -r backend/* /app/backend/ && \
    cp -r shared/* /app/shared/
RUN cd backend && npm run build
EXPOSE 4000
CMD ["node", "backend/dist/index.js"]