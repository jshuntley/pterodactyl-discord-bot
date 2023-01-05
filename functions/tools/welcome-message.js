const fs = require("fs");

const { EmbedBuilder } = require("discord.js");

module.exports = (bot) => {
  bot.welcomeMessage = async (config) => {
    const channel = await bot.channels.cache.get(config.channelId);

    const embed = new EmbedBuilder()
      .setColor("#0b5394")
      .setTitle("NZCS Status Bot")
      .setDescription(
        "Hello!\nThis message will be pinned and replaced with the server status soon."
      )
      .setTimestamp()
      .setFooter({ text: "Status updates en route. 🚀" });

    await channel.send({ embeds: [embed] }).catch(console.error);

    const initMessageId = await channel.messages
      .fetch({ limit: 1 })
      .then((sent) => {
        for (const [key, value] of sent) {
          return key;
        }
      });

    channel.messages.pin(initMessageId);

    const filePath = `./server-configs/${config.name}.json`;

    let cfg = fs.readFileSync(filePath);
    let data = JSON.parse(cfg);
    data.messageId = initMessageId;

    fs.writeFileSync(filePath, JSON.stringify(data), (error) => {
      if (error) {
        console.log(error);
      }
    });
  };
};
