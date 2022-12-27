module.exports = {
  data: {
    name: `bot-setup`,
  },

  async execute(interaction, bot) {
    bot.createConfig();
  },
};
