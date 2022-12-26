const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (bot) => {
  bot.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = bot;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const botId = "1056028972816805969";
    const guildId = "1055887588864557108";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Refreshing bot commands.");

      await rest.put(Routes.applicationGuildCommands(botId, guildId), {
        body: bot.commandArray,
      });

      console.log("Commands successfully added.");
    } catch (error) {
      console.error(error);
    }
  };
};
