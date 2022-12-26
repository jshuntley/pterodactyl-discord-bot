const fs = require("fs");

module.exports = {
  data: {
    name: `bot-setup`
  },

  async execute(interaction, bot) {
    console.log('⚠ - Executing modal.')
    const settings = {
      panelfqdn: interaction.fields.getTextInputValue("panelfqdn"),
      pteroapikey: interaction.fields.getTextInputValue("pteroapikey"),
      serverid: interaction.fields.getTextInputValue("serverid"),
    };

    fs.writeFile("settings.json", JSON.stringify(settings), (error) => {
      if (error) {
        console.log(error);
      };
    });

    await interaction.reply({
      content:
        "Pterodactyl settings saved!\nThe bot will now restart.",
    });
  },
};
