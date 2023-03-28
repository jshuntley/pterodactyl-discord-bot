#Pterodactyl Server Status Discord Bot v2.7

This project automatically updates post(s) with a Pterodactyl server's status in Discord.
  

## Still very much in development!

Feel free to leave a comment in discussions if you need help or are interested in helping with this project.

### Requirements
- Node.js & NPM
- Docker(optional)

First, you\'ll need to create a `.env` file and a `server-configs` folder in the root of the project.
You can run
```
touch .env && mkdir server-configs
```
from inside the root folder to accomplish this

Then, go to Discord\'s developer portal and create an application, create a bot, and get a token. **Keep this secure!** Don\'t upload it or post it anywhere! You have been warned. Next, in the developer portal, copy the client ID from the OAuth2 page and paste in the .env file as botId=YOUR-APP-ID

.env should look like 
```
token=<super_secret_bot_token>
botId=<app/bot_id>
```

https://discord.com/developers/applications

🚨 **YOU MUST** (for now) create a text channel in your server titled `bot-commands` for this to work.
  

### Get the bot in your server

In the Discord developer portal, navigate to your_application > OAuth2 > URL Generator, select bot, then Admin (or pick and choose), copy the generated link at the bottom and paste it in a browser, then select your server.
  

### Running the Bot

Navigate to the root folder (server-status-discord-bot if you cloned this repo)

run `npm i` to install the required packages

run `npm start` to get er goin

  
### Config Setup

You\'re going to need:

- A game/file name

- Your Pterodactyl FQDN

- Your Pterodactyl API key

- Your Pterodactyl server ID

- The ID of the Discord channel you want this to post in


~~The current file setup won't work with more than one word for the filename~~
~~ex. `The Forest` will cause an error.~~
~~You can put a dash or underscore like `The-Forest or The_Forest` to get around this until I fix it.~~
This now works!

Make sure you\'ve got developer mode enabled for Discord. You\'re going to need to right click on the channel to get the channel ID (for now).  

The bot will create a post in your Discord server\'s "bot-commands" channel and give you the command to input all the above info. The info will be saved locally in a <file-name_serverId>.json file in the server-configs folder.

The bot will restart several times automatically during setup.  

That\'s it! The bot should do the rest.
  

### Docker

Once you get your .env file created you can run `docker build -t <user_name/bot_name:tag_name> .` then run that image. If you\'re looking to save your game configs permanantly to the host, you can run it with `docker run -e .env -v .:/server-status-discord-bot`

You can also push the image to Docker Hub and use a docker-compose.yml file.
```
version:'3.8'
services:
	bot:
		image: <user_name/image_name:tag_name>
		env_file: .env
		volumes:
			- .:/server-status-discord-bot
```
  

### Future Features

- ~~Dockerization~~ \- completed, see guide

- ~~multiple server tracking~~ \- completed

- More Pterodactyl functions

    - server starts, stops, restarts

    - ~~resource utilization~~ \- completed

    - user info
