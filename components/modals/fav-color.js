const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `fav-color`
  },

  async execute(interaction, bot) {
    await interaction.reply({
        content: `You said your favorite color is: ${interaction.fields.getTextInputValue("favColorInput")}`
    });
  },
};
