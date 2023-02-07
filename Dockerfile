FROM alpine

RUN apk add --update nodejs npm

WORKDIR /server-status-discord-bot

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "start"]