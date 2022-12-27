const config = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    console.log(`🤖 - ${bot.user.tag}`);

    if (config.initialized == true && config.messageId != "") {
      setInterval(async () => {
        bot.statusUpdate();
      }, 60000); //Set time here, currently 1m
    } else if (config.initialized == true && config.messageId == "") {
      bot.welcomeMessage();
    } else {
      bot.onboarding();
    }
  },
};
