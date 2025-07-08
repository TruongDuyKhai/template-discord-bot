const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    deferReply: { ephemeral: true },
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("developer only")
        .addStringOption((option) =>
            option.setName("code").setDescription("code").setRequired(true)
        ),
    async execute(client, interaction) {
        if (!client.configs.settings.devUserIds.includes(interaction.user.id))
            return interaction.followUp({
                content: "You are not a developer.",
            });
        const code = interaction.options.getString("code");
        const { inspect } = require("util");
        let output;
        try {
            output = await eval(`(async () => { ${code} })()`);
        } catch (error) {
            output = error;
        }
        if (typeof output !== "string") output = inspect(output);
        return interaction.followUp({
            embeds: [
                client.embed("", {
                    title: "Result",
                    fields: [
                        {
                            name: "Input",
                            value:
                                code.length > 1014
                                    ? `See input.js`
                                    : `\`\`\`js\n${code}\n\`\`\``,
                        },
                        {
                            name: "Output",
                            value:
                                output.length > 1014
                                    ? `See output.js`
                                    : `\`\`\`js\n${output}\n\`\`\``,
                        },
                    ],
                }),
            ],
            files: [
                code.length > 1014
                    ? new AttachmentBuilder(Buffer.from(code, "utf-8"), {
                          name: "input.js",
                      })
                    : null,
                output.length > 1014
                    ? new AttachmentBuilder(Buffer.from(output, "utf-8"), {
                          name: "output.js",
                      })
                    : null,
            ].filter(Boolean),
        });
    },
};
