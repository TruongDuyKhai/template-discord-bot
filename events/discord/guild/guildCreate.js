module.exports = {
    name: "guildCreate",
    async execute(client, guild) {
        if (client.configs.settings.guildId !== guild.id) guild.leave();
    },
};
