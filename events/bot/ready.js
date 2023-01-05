const fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    console.log(`🤖 - ${bot.user.tag}`);

    const configFolder = fs.readdirSync("./server-configs");

    if (configFolder == "") {
      bot.onboarding();
    } else {
      setInterval(async () => {
        configFolder.forEach((file) => {
          const cfg = require(`../../server-configs/${file}`);

          try {
            bot.statusUpdate(cfg);
          } catch (error) {
            console.log(error);
          }
        });
      }, 60000); // Set to 1m
    }
  },
};
