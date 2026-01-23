const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    deferReply: {},
    data: new SlashCommandBuilder()
        .setName("bank-add")
        .setDescription("Add new bank account.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Tên tài khoản Ngân Hàng")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("bank")
                .setDescription("Ngân Hàng")
                .setRequired(true)
                .setAutocomplete(true),
        )
        .addStringOption((option) =>
            option
                .setName("account_number")
                .setDescription("Số tài khoản ngân hàng")
                .setRequired(true),
        ),
    async autoComplete(client, interaction) {
        const data = (await client.axios.get("https://api.vietqr.io/v2/banks"))
            .data.data;
        const focusedValue = interaction.options.getFocused();
        const choices = data.map((bank) => ({
            name: `${bank.shortName} - ${bank.name}`,
            value: `${bank.shortName}-${bank.bin}`,
        }));
        const filtered = choices.filter((choice) =>
            choice.name.toLowerCase().includes(focusedValue.toLowerCase()),
        );
        await interaction.respond(filtered.slice(0, 25));
    },
    async execute(client, interaction) {
        const name = interaction.options.getString("name");
        const bank = interaction.options.getString("bank");
        const account_number = interaction.options.getString("account_number");
        await client.db.create("banks", {
                name: name,
                bank: {
                    shortName: bank.split("-")[0],
                    bin: bank.split("-")[1],
                },
                account_number: account_number,
        });
        return interaction.followUp({ content: "Added bank account." });
    },
};
