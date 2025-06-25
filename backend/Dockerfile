FROM node:18
WORKDIR /app
COPY ../package.json ../package-lock.json ./
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "backend/dist/src/index.js"]
