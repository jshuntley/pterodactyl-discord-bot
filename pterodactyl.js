const settings = require("./settings.json");

const Nodeactyl = require("nodeactyl");
const ptero_client = new Nodeactyl.NodeactylClient(
  settings.panelfqdn,
  settings.pteroapikey
);

async function getServerStatus() {
  ptero_client.getServerStatus(settings.serverid).then(function (serverStatus) {
    if (serverStatus == "running") {
      const embed = new EmbedBuilder()
        .setColor("#09A837")
        .setTitle("Server Status")
        .setDescription("Server is running - :green_circle: ")
        .setTimestamp()
        .setFooter({ text: "You're welcome for my service!" });
      message.channel.send({ embeds: [embed] });
    } else if (serverStatus == "offline") {
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Server Status")
        .setDescription("Server is offline - :red_circle: ")
        .setTimestamp()
        .setFooter({ text: "Bummer dude 😢" });
      message.channel.send({ embeds: [embed] });
    } else if (serverStatus == "starting") {
      const embed = new EmbedBuilder()
        .setColor("#FBC42D")
        .setTitle("Server Status")
        .setDescription("Server is booting up - :yellow_circle: ")
        .setTimestamp()
        .setFooter({ text: "Get ready to rock! 😎" });
      message.channel.send({ embeds: [embed] });
    }
  });
}
