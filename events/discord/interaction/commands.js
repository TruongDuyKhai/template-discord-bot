module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        if(!interaction.guild) return;
        const command = client.slashCommands.find(e => e.data.name === interaction.commandName);
        if (!command) {
            return interaction.reply({
                ephemeral: true,
                content: 'Không tìm thấy lệnh, vui lòng thử lại sau.'
            })
        }
        if (command.deferReply) await interaction.deferReply(command.deferReply);
        await command.execute(client, interaction);
    }
}