const config = require("../../config.json");
const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = (bot) => {
  bot.onboarding = async () => {

    const channel = bot.channels.cache.find(channel => channel.name === 'general');

    const message = `This must be the first time you've run the bot.\nYou're going to need:\n• Pterodactyl Panel FQDN\n• Pterodactyl API Key\n• Pterodactyl Server ID\n• The Discord Channel ID\n• Discord Bot Message ID\n Once you've got all that info, please click the button below to begin the setup process.`;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bot-setup")
        .setLabel("Set Up")
        .setStyle(ButtonStyle.Primary)
    );

    await channel
      .send({ content: message, components: [button], ephemeral: true })
      .catch(console.error);
  };
};
