const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Displays current server status"),
  async execute(interaction, bot) {
    bot.serverStatus();
    const message = await interaction.reply('As requested:');
  },
};
