const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    deferReply: {},
    data: new SlashCommandBuilder()
        .setName('bank')
        .setDescription('Get QR Bank.')
        .setDefaultMemberPermissions()
        .addStringOption((option) =>
            option
                .setName('account')
                .setDescription('Số tài khoản ngân hàng')
                .setRequired(true)
                .setAutocomplete(true),
        ),
        async autoComplete(client, interaction) {
        const focusedValue = interaction.options.getFocused();
        const banks = await client.db.find('banks');
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
        const bankId = interaction.options.getString('account');
        const data = await client.db.findOne('banks', { _id: bankId });
        if (!data) {
            return interaction.followUp({ content: 'Bank account not found.' });
        }
        const QR = `https://img.vietqr.io/image/${data.bank.bin}-${
            data.account_number
        }-qr_only.png`;
        return interaction.followUp({ content: `Số tài khoản: \`${data.account_number}\` | ${data.bank.shortName}

Chủ tài khoản: \`${data.name}\`
- [Mã QR](${QR})` });
    },
};
