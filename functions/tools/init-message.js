const config = require("../../config.json");
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = (bot) => {
  bot.initMessage = async () => {
    const channel = await bot.channels.cache.get(config.channelId);

    // const embed = new EmbedBuilder()
    //   .setColor("#0455D8")
    //   .setTitle("Hello!")
    //   .setDescription(
    //     "This is the initial message for the bot.\nTo see the available bot commands type **/help**"
    //   )
    //   .setTimestamp()
    //   .setFooter({ text: "You're welcome for my service!" });

    const initMessage = `This must be the first time you've run the bot.\nPlease click the button below to begin the setup process.`;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bot-setup")
        .setLabel("Set Up")
        .setStyle(ButtonStyle.Primary)
    );

    await channel
      // .send({ embeds: [embed], components: [button] })
      .send({ content: initMessage, components: [button] })
      .catch(console.error);

    const initMessageId = await channel.messages
      .fetch({ limit: 1 })
      .then(sent => {
        console.log(sent.values());
      });

    // channel.messages.pin(initMessageId);

    // config.messageId = initMessage;
    // config.initialized = true;
  };
};
