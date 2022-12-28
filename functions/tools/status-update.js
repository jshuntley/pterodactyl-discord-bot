const { EmbedBuilder } = require("discord.js");
const Nodeactyl = require("nodeactyl");

module.exports = (bot) => {
  bot.statusUpdate = async (config) => {
    if (config.messageId == "") {
      await bot.welcomeMessage(config);
    } else {
      const channel = await bot.channels.cache.get(config.channelId);
      console.log(`${config.name}: channel: ${config.channelId}`);
      const msg = await channel.messages.fetch(config.messageId);
      console.log(`${config.name}: message: ${config.messageId}`);

      const ptero_client = new Nodeactyl.NodeactylClient(
        config.panelfqdn,
        config.pteroapikey
      );

      ptero_client
        .getServerStatus(config.serverid)
        .then(function (serverStatus) {
          if (serverStatus == "running") {
            const embed = new EmbedBuilder()
              .setColor("#09A837")
              .setTitle("Server Status")
              .setDescription("Server is running - 🟢 ")
              .setTimestamp()
              .setFooter({ text: `${config.configName}` });
            msg.edit({
              content: ``,
              embeds: [embed],
              components: [],
            });
          } else if (serverStatus == "offline") {
            const embed = new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle("Server Status")
              .setDescription("Server is offline - 🛑 ")
              .setTimestamp()
              .setFooter({ text: "Bummer dude 😢" });
            msg.edit({
              content: ``,
              embeds: [embed],
              components: [],
            });
          } else if (serverStatus == "starting") {
            const embed = new EmbedBuilder()
              .setColor("#FBC42D")
              .setTitle("Server Status")
              .setDescription("Server is booting up - 🚀 ")
              .setTimestamp()
              .setFooter({ text: "Get ready to rock! 😎" });
            msg.edit({
              content: ``,
              embeds: [embed],
              components: [],
            });
          }
        });
    }
  };
};
