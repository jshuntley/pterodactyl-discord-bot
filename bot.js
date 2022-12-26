require("dotenv").config();

const { token, guild, channelId, message } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const bot = new Client({ intents: GatewayIntentBits.Guilds });
bot.commands = new Collection();
bot.buttons = new Collection();
bot.modals = new Collection();
bot.menus = new Collection();

bot.commandArray = [];


const functionFolders = fs.readdirSync("./functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(bot);
}

bot.handleEvents();
bot.handleCommands();
bot.handleComponents();


bot.login(token);