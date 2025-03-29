const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    deferReply: {},
    data: new SlashCommandBuilder()
        .setName()
        .setDescription()
        .setDefaultMemberPermissions(),
    async execute(client, interaction) {},
};
