FROM node:18 AS builder
WORKDIR /app
COPY ../package.json ../package-lock.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
