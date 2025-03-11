module.exports = {
    name: "guildCreate",
    async execute(client, guild) {
        if (client.configs.settings.guildId !== interaction.guild.id)
            guild.leave();
    },
};
