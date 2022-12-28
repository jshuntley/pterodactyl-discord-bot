const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = (bot) => {
  bot.createConfig = async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("create-config")
      .setTitle("Create Config");

    const configName = new TextInputBuilder()
      .setCustomId("configName")
      .setLabel("Game Name")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Valheim")
      .setRequired(true);

    const fqdnInput = new TextInputBuilder()
      .setCustomId("panelfqdn")
      .setLabel("Pterodactyl Panel FQDN")
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

    const cfgName = new ActionRowBuilder().addComponents(configName);
    const fqdn = new ActionRowBuilder().addComponents(fqdnInput);
    const api = new ActionRowBuilder().addComponents(apiInput);
    const server = new ActionRowBuilder().addComponents(serverInput);
    const channel = new ActionRowBuilder().addComponents(channelInput);

    modal.addComponents(
      cfgName,
      fqdn,
      api,
      server,
      channel
    );
    await interaction.showModal(modal);
  };
};
