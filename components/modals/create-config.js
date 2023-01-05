const fs = require("fs");

module.exports = {
  data: {
    name: `create-config`,
  },

  async execute(interaction) {
    const name = interaction.fields.getTextInputValue("configName").replace(/\s/g, "-");
    const configName =
      name + "_" + interaction.fields.getTextInputValue("serverid");

    const config = {
      name: configName,
      panelfqdn: interaction.fields.getTextInputValue("panelfqdn"),
      pteroapikey: interaction.fields.getTextInputValue("pteroapikey"),
      serverid: interaction.fields.getTextInputValue("serverid"),
      channelId: interaction.fields.getTextInputValue("channelid"),
      messageId: "",
    };

    fs.writeFileSync(
      `./server-configs/${configName}.json`,
      JSON.stringify(config),
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );

    await interaction.reply({
      content: `Pterodactyl server settings saved to ${configName}.json!\nThe bot will now restart.`, ephemeral: true
    });
  },
};
