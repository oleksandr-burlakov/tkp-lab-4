FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_OPTIONS="--experimental-vm-modules"
# Запускаємо тести
CMD ["npm", "test"]