const { AttachmentBuilder } = require("discord.js");

module.exports = {
    name: "eval",
    description: "eval",
    usage: "eval <code>",
    aliases: ["e"],
    category: "Development",
    async execute(client, message, args) {
        const { inspect } = require("util");

        var input = args.join(" ");
        input = input.replaceAll("```", "");
        if (!input) {
            return message
                .reply({
                    embeds: [client.embed("Please provide some code.")],
                })
                .catch((e) => {});
        }
        let output;
        try {
            output = await eval(`(async () => { ${input} })()`);
        } catch (e) {
            return message
                .reply({
                    embeds: [
                        client.embed(`\`\`\`diff\n${e}\n\`\`\``, {
                            title: "Error",
                        }),
                    ],
                })
                .catch((e) => {});
        }

        if (typeof output !== "string") output = inspect(output);

        return message
            .reply({
                embeds: [
                    client.embed(undefined, {
                        title: "Result",
                        fields: [
                            {
                                name: "Input",
                                value:
                                    input.length > 1014
                                        ? `See input.js`
                                        : `\`\`\`js\n${input}\n\`\`\``,
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
                    input.length > 1014
                        ? new AttachmentBuilder(Buffer.from(input, "utf-8"), {
                              name: "input.js",
                          })
                        : null,
                    output.length > 1014
                        ? new AttachmentBuilder(Buffer.from(output, "utf-8"), {
                              name: "output.js",
                          })
                        : null,
                ].filter(Boolean),
            })
            .catch((e) => {});
    },
};
