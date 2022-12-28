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
          bot.statusUpdate(cfg);
        });
      }, 10000); // Set to 1m
    }
  },
};
