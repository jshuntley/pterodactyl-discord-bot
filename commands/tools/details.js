const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usage")
    .setDescription("Displays current server details"),
  async execute(interaction, bot) {
    bot.serverUsage();
    const message = await interaction.reply('As requested:');
  },
};
