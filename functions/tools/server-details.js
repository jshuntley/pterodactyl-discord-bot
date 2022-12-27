const config = require("../../config.json");

const { EmbedBuilder } = require("discord.js");
const Nodeactyl = require("nodeactyl");
const ptero_client = new Nodeactyl.NodeactylClient(
  config.panelfqdn,
  config.pteroapikey
);

module.exports = (bot) => {
  bot.serverUsage = async () => {
    const channel = await bot.channels.cache.get(config.channelId);

    const usages = await ptero_client.getServerUsages(config.serverid);
    //   channel.send(response);
    const resources = usages.resources;

    const embed = new EmbedBuilder()
      .setColor("#0b5394")
      .setTitle("Server Resources")
      .setDescription(
        `Memory: ` +
          (resources.memory_bytes / 1073741824).toFixed(2) +
          `GB\nCPU use: ` +
          (resources.cpu_absolute).toFixed(2) +
          `%\nDisk use: ` +
          (resources.disk_bytes / 1073741824).toFixed(2) +
          `GB\n Server Uptime: ` +
          (resources.uptime / 1000 / 60 / 60).toFixed(2) +
          ` hrs`
      )
      .setTimestamp()
      .setFooter({ text: "Doin work 💪" });

    await channel.send({ embeds: [embed] }).catch(console.error);
  };
};

// resources: {
//     memory_bytes: 2034323456,
//     cpu_absolute: 25.106,
//     disk_bytes: 1930465366,
//     network_rx_bytes: 184344110,
//     network_tx_bytes: 28202524,
//     uptime: 163998274
//   }
