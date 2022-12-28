const fs = require("fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usage")
    .setDescription("Displays current server details")
    .addStringOption((option) =>
      option.setName("server").setDescription("The server to get status of.")
    ),
  async execute(interaction, bot) {
    const server = interaction.options.getString("server");

    const configs = fs.readdirSync(`./server-configs`);
    configs.forEach((file) => {
      const config = file.split("_");

      if (file == `${server}_${config[1]}`) {
        const f = fs.readFileSync(`./server-configs/${file}`);
        const cfg = JSON.parse(f);

        bot.serverUsage(cfg);
      }
    });

    const message = await interaction.reply("As requested:");
  },
};
