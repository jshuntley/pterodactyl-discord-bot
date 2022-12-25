const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  InteractionType,
  EmbedBuilder,
  ModalBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const config = require("./config.json");
const settings = require("./settings.json");
const { readSync } = require("node:fs");

const Nodeactyl = require("nodeactyl");
const ptero_client = new Nodeactyl.NodeactylClient(
  settings.panelfqdn,
  settings.pteroapikey
);

// const { getServerStatus } = require("./pterodactyl.js");

// Create the bot and give it permissions
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

// Build the slash commands list
bot.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    bot.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}


// Interactions with Discord
bot.on(Events.InteractionCreate, async (interaction) => {
if (interaction.isModalSubmit()) {
    try {
      if (interaction.customId === "setup-modal") {
        const settings = {
          panelfqdn: interaction.fields.getTextInputValue("panelfqdn"),
          pteroapikey: interaction.fields.getTextInputValue("pteroapikey"),
          serverid: interaction.fields.getTextInputValue("serverid"),
        };

        fs.writeFile("settings.json", JSON.stringify(settings), (error) => {
          if (error) throw error;
        });

        await interaction.reply(
          "Pterodactyl settings saved!\nYou'll need to restart the bot now."
        );
      }
    } catch {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// Pterodactyl Stuff
bot.on("messageCreate", (message) => {
  if (message.content == config.prefix + "status") {
    ptero_client
      .getServerStatus(settings.serverid)
      .then(function (serverStatus) {
        if (serverStatus == "running") {
          const embed = new EmbedBuilder()
            .setColor("#09A837")
            .setTitle("Server Status")
            .setDescription("Server is running - :green_circle: ")
            .setTimestamp()
            .setFooter({ text: "You're welcome for my service!" });
          message.channel.send({ embeds: [embed] });
        } else if (serverStatus == "offline") {
          const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Server Status")
            .setDescription("Server is offline - :red_circle: ")
            .setTimestamp()
            .setFooter({ text: "Bummer dude 😢" });
          message.channel.send({ embeds: [embed] });
        } else if (serverStatus == "starting") {
          const embed = new EmbedBuilder()
            .setColor("#FBC42D")
            .setTitle("Server Status")
            .setDescription("Server is booting up - :yellow_circle: ")
            .setTimestamp()
            .setFooter({ text: "Get ready to rock! 😎" });
          message.channel.send({ embeds: [embed] });
        }
      });
  }
});

bot.on("messageCreate", (message) => {
  if (message.content == config.prefix + "help") {
    const embed = new EmbedBuilder()
      .setColor("#0455D8")
      .setTitle("Bot Help")
      .setDescription("To check the status run **" + config.prefix + "status**")
      .setTimestamp()
      .setFooter({ text: "The more you know! 🌈🌟" });
    message.channel.send({ embeds: [embed] });
  }
});

// Every minute update the server's status
setInterval(async () => {
  const msg = await bot.channels.cache
    .get("1055887590617788509")
    .messages.fetch("1056293447553798315");

  ptero_client.getServerStatus(config.serverid).then(function (serverStatus) {
    if (serverStatus == "running") {
      const embed = new EmbedBuilder()
        .setColor("#09A837")
        .setTitle("Server Status")
        .setDescription("Server is running - :green_circle: ")
        .setTimestamp()
        .setFooter({ text: "You're welcome for my service!" });
      msg.edit({ embeds: [embed] });
    } else if (serverStatus == "offline") {
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Server Status")
        .setDescription("Server is offline - :red_circle: ")
        .setTimestamp()
        .setFooter({ text: "Bummer dude 😢" });
      msg.edit({ embeds: [embed] });
    } else if (serverStatus == "starting") {
      const embed = new EmbedBuilder()
        .setColor("#FBC42D")
        .setTitle("Server Status")
        .setDescription("Server is booting up - :yellow_circle: ")
        .setTimestamp()
        .setFooter({ text: "Get ready to rock! 😎" });
      msg.edit({ embeds: [embed] });
    }
  });
}, 60000); //Set time here, currently 1m

bot.login(config.token);
