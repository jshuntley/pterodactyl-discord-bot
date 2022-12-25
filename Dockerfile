FROM node:16

WORKDIR /server-status-discord-bot

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js"]