FROM node:19

WORKDIR /server-status-discord-bot

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start"]