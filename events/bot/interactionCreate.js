module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if (interaction.isChatInputCommand()) {
      const { commands } = bot;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, bot);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `⛔ - Something went wrong during command execution.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = bot;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("⛔ - No code for this button.");

      try {
        await button.execute(interaction, bot);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isModalSubmit()) {
      const { modals } = bot;
      const { customId } = interaction;
      
      console.log(`👍 - Modal "${customId}" submitted..`)

      const modal = modals.get(customId);
      console.log(`❔ - Verifying "${modal.data.name}" exists.`)
      if (!modal) return new Error("⛔ - No code for this modal.");

      try {
        console.log(`👍 - Modal "${modal.data.name}" being executed.. `)

        await modal.execute(interaction, bot);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
