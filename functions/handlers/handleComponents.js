const fs = require("fs");

module.exports = (bot) => {
  console.log(`🚧 - Building components collections.`);
  bot.handleComponents = async () => {
    const componentFolders = fs.readdirSync("./components");
    for (const folder of componentFolders) {
      const componentFiles = fs
        .readdirSync(`./components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons, modals } = bot;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            console.log(`✔ - Added "${button.data.name}" modal to collection.`);
          }
          break;

        case "modals":
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
            console.log(`✔ - Added "${modal.data.name}" modal to collection.`);
          }
          break;

        default:
          break;
      }
    }
  };
};
