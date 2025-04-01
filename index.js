require("dotenv").config();

const discord = require("discord.js");
const { Partials } = discord;
const Client = require("./extensions/discordClient");

const client = new Client({
    intents: 131071,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    allowedMentions: {
        repliedUser: false,
        parse: ["users"],
    },
    token: require("./configs/settings").token,
});

client.init();

module.exports = client;
