module.exports = {
    data: {
        name: `channel-select`,
    },

    async execute(interaction) {
        await interaction.reply({
            content: `You selected: ${interaction.values[0]}`
        })
    }
}