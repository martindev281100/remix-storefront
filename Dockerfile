FROM node:16-alpine3.16

WORKDIR /usr/server/app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build # will build remix app
