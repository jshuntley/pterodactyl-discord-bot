const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('marco')
		.setDescription('Replies with Polo!'),
	async execute(interaction) {
		await interaction.reply('Polo!');
	},
};