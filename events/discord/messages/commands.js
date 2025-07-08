module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        const { guild, author, channel } = message;
        if (!guild) return;
        if (author.bot) return;
        if (!client.configs.settings.textCommands) return;
        const prefix = client.configs.settings.prefix;

        if (
            ![`<@${client.user.id}>`, `<@!${client.user.id}>`].find((e) =>
                message.content.startsWith(e)
            ) &&
            !message.content.startsWith(prefix)
        )
            return;

        if (
            [`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(
                message.content
            )
        ) {
            return message
                .reply({
                    embeds: [
                        client.embed(
                            `Chào ${author.username}! Prefix của tôi là \`${prefix}\`\nDùng \`${prefix}help\` để xem các lệnh của tôi!`
                        ),
                    ],
                })
                .catch((e) => {});
        }

        var args;
        if (message.content.startsWith(prefix))
            args = await message.content.replace(prefix, "").trim().split(/ +/);
        else
            args = await message.content
                .replace(`<@${client.user.id}>`, "")
                .replace(`<@!${client.user.id}>`, "")
                .trim()
                .split(/ +/);

        const nameCommand = args.shift().toLowerCase();
        const command =
            client.textCommands.find((e) => e.name === nameCommand) ||
            client.textCommands.find((e) => e.aliases?.includes(nameCommand));
        if (!command) return;
        if (
            command.category === "Development" &&
            !client.configs.settings.devUserIds.includes(author.id)
        )
            return;
        command.execute(client, message, args);
    },
};
