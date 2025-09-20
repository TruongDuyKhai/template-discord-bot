require("dotenv").config();

const discord = require("discord.js");
const { Partials, Options } = discord;
const Client = require("./extensions/discordClient");

const client = new Client({
    intents: 131071,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    allowedMentions: {
        repliedUser: false,
        parse: ["users"],
    },
    sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
            interval: 3600,
            filter: () => (message) => true,
        },
        users: {
            interval: 3600,
            filter: () => (user) => user.bot && user.id !== user.client.user.id,
        },
        invites: {
            interval: 3600,
            filter: () => (invite) => true,
        },
        users: {
            interval: 3600,
            filter: () => (user) => true,
        },
        presences: {
            interval: 3600,
            filter: () => (presence) => true,
        },
        reactions: {
            interval: 3600,
            filter: () => (reaction) => true,
        },
        emojis: {
            interval: 3600,
            filter: () => (emoji) => true,
        },
        bans: {
            interval: 3600,
            filter: () => (ban) => true,
        },
    },
    token: require("./configs/settings").token,
});

client.init();

module.exports = client;
