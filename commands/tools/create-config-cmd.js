const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-config")
    .setDescription("Set up Pterodactyl server monitoring."),
    
    async execute(interaction, bot) {
      bot.createConfig(interaction);
      }
};
