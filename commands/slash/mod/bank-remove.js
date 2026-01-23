const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    deferReply: {},
    data: new SlashCommandBuilder()
        .setName("bank-remove")
        .setDescription("Remove a bank account.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Name of the bank account.")
                .setRequired(true)
                .setAutocomplete(true),
        ),
    async autoComplete(client, interaction) {
        const focusedValue = interaction.options.getFocused();
        const banks = await client.db.find("banks");
        const choices = banks.map((bank) => ({
            name: `${bank.name} - ${bank.account_number} - ${bank.bank.shortName}`,
            value: bank._id,
        }));
        const filtered = choices.filter((choice) =>
            choice.name.toLowerCase().includes(focusedValue.toLowerCase()),
        );
        await interaction.respond(filtered.slice(0, 25));
    },
    async execute(client, interaction) {
        const bankId = interaction.options.getString("name");
        await client.db.findOneAndDelete("banks", { _id: bankId });
        return interaction.followUp({ content: "Removed bank account." });
    },
};
