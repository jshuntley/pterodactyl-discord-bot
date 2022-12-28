const { EmbedBuilder } = require("discord.js");
const Nodeactyl = require("nodeactyl");

module.exports = (bot) => {
  bot.serverUsage = async (config) => {
    const ptero_client = new Nodeactyl.NodeactylClient(
      config.panelfqdn,
      config.pteroapikey
    );

    const channel = await bot.channels.cache.get(config.channelId);

    const usages = await ptero_client.getServerUsages(config.serverid);
    const resources = usages.resources;

    const embed = new EmbedBuilder()
      .setColor("#0b5394")
      .setTitle("Server Resources")
      .setDescription(
        `Memory: ` +
          (resources.memory_bytes / 1073741824).toFixed(2) +
          `GB\nCPU use: ` +
          resources.cpu_absolute.toFixed(2) +
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
