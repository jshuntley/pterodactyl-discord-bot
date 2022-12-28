module.exports = {
  data: {
    name: `create-config`,
  },

  async execute(interaction, bot) {
    bot.createConfig(interaction);
   }
};
