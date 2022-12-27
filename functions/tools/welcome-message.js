const config = require("../../config.json");
const fs = require("fs");

const { EmbedBuilder } = require("discord.js");

module.exports = (bot) => {
  bot.welcomeMessage = async () => {
    const channel = await bot.channels.cache.get(config.channelId);

    const embed = new EmbedBuilder()
      .setColor("#0b5394")
      .setTitle("NZCS Status Bot")
      .setDescription(
        "Hello!\nThis message will be pinned and replaced with the server status soon.\nTo see the other bot functions type **/help**"
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

    let cfg = fs.readFileSync("./config.json");
    let data = JSON.parse(cfg);
    data.messageId = initMessageId;


    fs.writeFileSync('./config.json', JSON.stringify(data), (error) => {
      if (error) {
        console.log(error);
      }
    });
  };
};
