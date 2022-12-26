const fs = require("fs");

module.exports = {
  data: {
    name: `bot-setup`
  },

  async execute(interaction, bot) {
    const config = {
      panelfqdn: interaction.fields.getTextInputValue("panelfqdn"),
      pteroapikey: interaction.fields.getTextInputValue("pteroapikey"),
      serverid: interaction.fields.getTextInputValue("serverid")
    };

    fs.writeFile("config.json", JSON.stringify(config), (error) => {
      if (error) {
        console.log(error);
      };
    });

    await interaction.reply({
      content:
        "Pterodactyl settings saved to config.json!\nThe bot will now restart.",
    });
  },
};
