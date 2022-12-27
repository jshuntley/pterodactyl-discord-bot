const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays available bot commands."),
  async execute(interaction, bot) {
    const message = await interaction.reply('Available NZCS Bot Commands:\n/marco\n/ping\n/bot-setup\n/help');
  },
};
