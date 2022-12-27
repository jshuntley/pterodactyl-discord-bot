const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: {
    name: `bot-setup`,
  },

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("bot-setup")
      .setTitle("Bot Setup");
    const fqdnInput = new TextInputBuilder()
      .setCustomId("panelfqdn")
      .setLabel("Panel FQDN")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("http(s)://example.com")
      .setRequired(true);

    const apiInput = new TextInputBuilder()
      .setCustomId("pteroapikey")
      .setLabel("Pterodactyl API Key")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("ptlc_6DcWW8RWrJ2i6a5qiFUbAtPyjPNYTe6mnmNcGZhGcLb")
      .setRequired(true);

    const serverInput = new TextInputBuilder()
      .setCustomId("serverid")
      .setLabel("Pterodactyl Server ID")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("8umdgjxc")
      .setRequired(true);

    const channelInput = new TextInputBuilder()
      .setCustomId("channelid")
      .setLabel("Discord Channel ID")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("1055887590617788509")
      .setRequired(true);


    const firstActionRow = new ActionRowBuilder().addComponents(fqdnInput);
    const secondActionRow = new ActionRowBuilder().addComponents(apiInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(serverInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(channelInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
    await interaction.showModal(modal);
  },
};
