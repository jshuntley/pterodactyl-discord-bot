FROM node:16

WORKDIR /server-status-discord-bot

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "nodemon", "bot.js"]