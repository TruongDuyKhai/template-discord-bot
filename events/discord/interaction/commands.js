module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.guild) return;
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.find(
                (e) => e.data.name === interaction.commandName
            );
            if (!command) {
                return interaction.reply({
                    ephemeral: true,
                    content: "Không tìm thấy lệnh, vui lòng thử lại sau.",
                });
            }
            if (command.deferReply)
                await interaction.deferReply(command.deferReply);
            await command.execute(client, interaction);
        }
        if (interaction.isAutocomplete()) {
            const command = client.slashCommands.find(
                (e) => e.data.name === interaction.commandName
            );
            if (!command) return;
            await command.autoComplete(client, interaction);
        }
    },
};
