const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("frnd")
    .setDescription("Your best friend out of the box."),
  async execute(interaction, bot) {
    const message = await interaction.reply("Absolom?!");
  },
};
