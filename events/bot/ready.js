module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    console.log(`👍 - ${bot.user.tag}`);
  },
};
