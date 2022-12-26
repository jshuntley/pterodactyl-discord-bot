const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");

  module.exports = {
    data: new SlashCommandBuilder()
    .setName('modal')
    .setDescription('WHAT is your favorite color?'),

    async execute(interaction, bot) {
        const modal = new ModalBuilder()
        .setCustomId(`fav-color`)
        .setTitle(`Favorite Color`);

        const colorInput = new TextInputBuilder()
        .setCustomId("favColorInput")
        .setLabel("What's your favorite color?")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("Green")
        .setRequired(true);

        const colorActionRow = new ActionRowBuilder().addComponents(colorInput);
  
      modal.addComponents(colorActionRow);
      await interaction.showModal(modal);
    }
  }