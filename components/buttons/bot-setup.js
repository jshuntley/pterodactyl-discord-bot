module.exports = {
    data: {
        name: `bot-setup`
    },

    async execute(interaction, bot) {
        await interaction.reply({
            content: `You clicked the button!`
        });
    }
}