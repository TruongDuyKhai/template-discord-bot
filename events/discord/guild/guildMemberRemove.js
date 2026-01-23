module.exports = {
    name: 'guildMemberRemove',
    async execute(client, member) {
        const channel = client.channels.cache.get(
            client.configs.settings.goodbyeChannelId,
        );
        if (!channel) return;
        channel.send({
            content: `User <@${member.user.id}> đã cook rồi, hẹn gặp lại bạn vào dịp khác 😢`,
        });
    }
}