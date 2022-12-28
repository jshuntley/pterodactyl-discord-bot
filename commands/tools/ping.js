const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Gets bot ping"),
  async execute(interaction, bot) {
    const message = await interaction.deferReply({
        fetchReply: true
    });

    const newMessage = `API Latency: ${bot.ws.ping}ms\nBot ping: ${message.createdTimestamp - interaction.createdTimestamp}ms`
    await interaction.editReply({
        content: newMessage
    });
  }
};
