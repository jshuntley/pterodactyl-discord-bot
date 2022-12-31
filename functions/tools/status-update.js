const { EmbedBuilder } = require("discord.js");
const Nodeactyl = require("nodeactyl");

module.exports = (bot) => {
  bot.statusUpdate = async (config) => {
    if (config.messageId == "") {
      await bot.welcomeMessage(config);
    } else {
      const channel = await bot.channels.cache.get(config.channelId);
      const msg = await channel.messages.fetch(config.messageId);

      const ptero_client = new Nodeactyl.NodeactylClient(
        config.panelfqdn,
        config.pteroapikey
      );

      try {
        await ptero_client
          .getServerStatus(config.serverid)
          .then(function (serverStatus) {
            if (serverStatus == "running") {
              const embed = new EmbedBuilder()
                .setColor("#09A837")
                .setTitle("Server Status")
                .setDescription("Server is running - 🟢 ")
                .setTimestamp()
                .setFooter({ text: `${config.name}` });
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
      } catch (error) {
        console.log(error);

        const embed = new EmbedBuilder()
          .setColor("#DAA520")
          .setTitle("Server Status")
          .setDescription(
            "Having trouble getting the status of your server - ⚠ "
          )
          .setTimestamp()
          .setFooter({ text: "Ruh roh, Raggy!" });
        msg.edit({
          content: ``,
          embeds: [embed],
          components: [],
        });
      }
    }
  };
};
