# Discord Bot for Pterodactyl Server Status v1.0
This project automatically updates a post with Pterodactyl server status in Discord.

## Still very much in development!
Project requires Node.js & NPM

First, you\'ll need to go to Discord\'s developer portal and create an application, create a bot, and get a token. Place that in the .env file as token=YOUR-BOT-TOKEN
**Keep this secure!** Don\'t upload it or post it anywhere! You have been warned.
Next, in the developer portal, copy the client ID from the OAuth2 page and paste in the .env file as botId=YOUR-APP-ID
https://discord.com/developers/applications

### Get the bot in your server
In the Discord developer portal, navigate to your_application > OAuth2 > URL Generator, select bot, then Admin (or pick and choose), copy the generated link at the bottom and paste it in a browser, then select your server.

### Running the Bot
Navigate to the root folder (server-status-discord-bot if you cloned this repo)
run `npm i` to install the required packages
run `npm start` to get er goin

You\'re going to need:
- your Pterodactyl FQDN
- your Pterodactyl API key
- your Pterodactyl server ID
- the ID of the Discord channel you want this to post in

Make sure you\'ve got developer mode enabled for Discord. You\'re going to need to right click on the channel to get the channel ID (for now).

The bot should create a post in your Discord server\'s "general" channel and show you a button to input all the above info. The info will be saved locally in the config.json file.

The bot will restart several times automatically during setup.

That\'s it! The bot should do the rest.

### Future Features
- Dockerization
- multiple server tracking
- More Pterodactyl functions
	- server starts, stops, restarts
	- resource utilization
	- user info
