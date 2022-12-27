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

  async execute(interaction, bot) {
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
      .setLabel("Server ID")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("8umdgjxc")
      .setRequired(true);

    const channelInput = new TextInputBuilder()
      .setCustomId("channelid")
      .setLabel("Channel ID")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("1055887590617788509")
      .setRequired(true);

    // const messageInput = new TextInputBuilder()
    //   .setCustomId("messageid")
    //   .setLabel("Message ID")
    //   .setStyle(TextInputStyle.Short)
    //   .setPlaceholder("1057136145462472824")
    //   .setRequired(true);


    const firstActionRow = new ActionRowBuilder().addComponents(fqdnInput);
    const secondActionRow = new ActionRowBuilder().addComponents(apiInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(serverInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(channelInput);
    // const fifthActionRow = new ActionRowBuilder().addComponents(messageInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
    await interaction.showModal(modal);
  },
};
