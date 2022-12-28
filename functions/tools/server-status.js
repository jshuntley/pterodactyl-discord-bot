const config = require("../../config.json");

const { EmbedBuilder } = require("discord.js");
const Nodeactyl = require("nodeactyl");
const ptero_client = new Nodeactyl.NodeactylClient(
  config.panelfqdn,
  config.pteroapikey
);

module.exports = (bot) => {
  bot.serverStatus = async () => {
    const channel = await bot.channels.cache.get(config.channelId);

    ptero_client
      .getServerStatus(config.serverid)
      .then(function (serverStatus) {
        if (serverStatus == "running") {
          const embed = new EmbedBuilder()
            .setColor("#09A837")
            .setTitle("Server Status")
            .setDescription("Server is running - 🟢 ")
            .setTimestamp()
            .setFooter({ text: "You're welcome for my service!" });
          channel.send({
            embeds: [embed],
          });
        } else if (serverStatus == "offline") {
          const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Server Status")
            .setDescription("Server is offline - 🛑 ")
            .setTimestamp()
            .setFooter({ text: "Bummer dude 😢" });
          channel.send({
            embeds: [embed],
          });
        } else if (serverStatus == "starting") {
          const embed = new EmbedBuilder()
            .setColor("#FBC42D")
            .setTitle("Server Status")
            .setDescription("Server is booting up - 🚀 ")
            .setTimestamp()
            .setFooter({ text: "Get ready to rock! 😎" });
          channel.send({
            embeds: [embed],
          });
        }
      });
  };
};
