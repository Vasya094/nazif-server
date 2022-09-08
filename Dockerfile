FROM node:17.7.1-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]