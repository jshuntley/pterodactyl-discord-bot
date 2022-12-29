module.exports = (bot) => {
  bot.onboarding = async () => {
    const channel = bot.channels.cache.find(
      (channel) => channel.name === "bot-commands"
    );

    const message = `This must be the first time you've run the bot.\nYou're going to need:\n• Pterodactyl Panel FQDN\n• Pterodactyl API Key\n• Pterodactyl Server ID\n• The Discord Channel ID\n Once you're ready, run \`/create-config\` to add your first server.`;

    await channel.send({ content: message }).catch(console.error);
  };
};
