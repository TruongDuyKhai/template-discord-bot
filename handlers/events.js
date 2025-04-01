const { Events: DiscordEventNames } = require("discord.js");
const { readFiles } = require("@khaidev1012/funcs");

exports.load = () => {
    var events = {
        discord: [],
    };

    const discordEventFiles = readFiles(`${process.cwd()}/events/discord`, {
        extensions: [".js"],
        noPromise: true,
    });

    Object.values(DiscordEventNames).forEach((name) => {
        const discordEvents = discordEventFiles
            .map((e) => require(e))
            .filter((e) => e.name === name);
        events.discord.push(...discordEvents);
    });
    return events;
};

exports.init = (client) => {
    Object.values(DiscordEventNames).forEach((name) => {
        client.on(name, (...args) =>
            client.events.discord
                .filter((e) => e.name === name)
                .forEach((e) => e.execute(client, ...args))
        );
    });
};
