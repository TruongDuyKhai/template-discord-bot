module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {
        const welcomeChannelId = client.channels.cache.get(
            client.configs.settings.welcomeChannelId,
        );
        if (!welcomeChannelId) return;
        welcomeChannelId.send({
            content: `⋆˚꩜｡ welcome ${member.user} !! tysm for joining ${member.guild.name} (˶˃𐃷˂˶)`,
            embeds: [
                client.embed({
                    title: "💗 WELCOME NEW MEMBER 💗",
                    description: `✩₊˚Đừng quên đọc luật của server nha : <#1461517355111940231>\n\n✩₊˚Nơi các bạn chat : <#1461438699056402749>`,
                    image: {
                        url: "https://cdn.discordapp.com/attachments/1461579408254046465/1463794962242994249/retouch_2026011700030474.png?ex=697320ca&is=6971cf4a&hm=f899c72669b9fc10d5942876ab19dd1d773f5ed6c08eb9fa82dd5f1e68e72a0f&",
                    },
                }),
            ],
        });
    },
};
