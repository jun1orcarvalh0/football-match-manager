FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]