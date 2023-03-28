const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask Chat-GPT a question")
    .addStringOption((option) =>
      option.setName("question").setDescription("Your question")
    ),
  async execute(interaction, bot) {
    const question = interaction.options.getString("question");

    bot.askGPT(question);

    const message = await interaction.reply(`${interaction.user} said: ${question}`);
  },
};