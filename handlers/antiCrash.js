require("colors");
const excepts = [
    "Socket connection timeout",
    "fetch failed",
    "Unknown interaction",
    "Unexpected end of JSON input",
    `is not valid JSON`,
    "Cannot perform IP discovery - socket closed",
    "AggregateError",
    "read ECONNRESET",
    "connection <monitor> to",
    "Connect Timeout Error",
    "connection timed out",
    "Request aborted",
    "getaddrinfo ENOTFOUND",
    "Opening handshake has timed out",
];
const client = require(`../index`);
const { inspect } = require("util");
const { AttachmentBuilder } = require("discord.js");
client.on("error", (e) => {
    client.sendWebhook(process.env.WEBHOOK_LOG, {
        embeds: [
            client.embed(`\`\`\`\n${inspect(e, { depth: 0 })}\n\`\`\``, {
                title: "Error",
                url: "https://discordjs.guide/popular-topics/errors.html#api-errors",
                timestamp: true,
            }),
        ],
    });
});

process.on("unhandledRejection", async (reason, p) => {
    if (excepts.find((e) => reason.message.search(e) !== -1)) return;
    const r = inspect(reason, { depth: 0 });
    const promise = inspect(p, { depth: 0 });
    client.sendWebhook(process.env.WEBHOOK_LOG, {
        files: [
            r.length > 1014
                ? new AttachmentBuilder(Buffer.from(r, "utf-8"), {
                      name: "Reason.txt",
                  })
                : null,
            promise.length > 1014
                ? new AttachmentBuilder(Buffer.from(promise, "utf-8"), {
                      name: "Promise.txt",
                  })
                : null,
        ],
        embeds: [
            client.embed(undefined, {
                title: `Unhandled Rejection/Catch: ${reason.message}`,
                fields: [
                    {
                        name: "Reason",
                        value: `\`\`\`\n${
                            r.length > 1014 ? "See Reason.txt" : r
                        }\n\`\`\``,
                    },
                    {
                        name: "Promise",
                        value: `\`\`\`\n${
                            promise.length > 1014 ? "See Promise.txt" : promise
                        }\n\`\`\``,
                    },
                ],
                url: "https://nodejs.org/api/process.html#event-unhandledrejection",
                timestamp: true,
            }),
        ],
    });
});

process.on("uncaughtException", async (error, origin) => {
    const e = inspect(error, {
        depth: 0,
    });
    const o = inspect(origin, {
        depth: 0,
    });
    client.sendWebhook(process.env.WEBHOOK_LOG, {
        files: [
            e.length > 1014
                ? new AttachmentBuilder(Buffer.from(e, "utf-8"), {
                      name: "Error.txt",
                  })
                : null,
            o.length > 1014
                ? new AttachmentBuilder(Buffer.from(o, "utf-8"), {
                      name: "Origin.txt",
                  })
                : null,
        ],
        embeds: [
            client.embed(undefined, {
                title: `Uncaught Exception/Catch ${error.message}`,
                fields: [
                    {
                        name: "Error",
                        value: `\`\`\`\n${
                            e.length > 1014 ? "See Error.txt" : e
                        }\n\`\`\``,
                    },
                    {
                        name: "Origin",
                        value: `\`\`\`\n${
                            o.length > 1014 ? "See Origin.txt" : o
                        }\n\`\`\``,
                    },
                ],
                url: "https://nodejs.org/api/process.html#event-uncaughtexception",
                timestamp: true,
            }),
        ],
    });
});

process.on("uncaughtExceptionMonitor", async (error, origin) => {
    const e = inspect(error, {
        depth: 0,
    });
    const o = inspect(origin, {
        depth: 0,
    });
    client.sendWebhook(process.env.WEBHOOK_LOG, {
        files: [
            e.length > 1014
                ? new AttachmentBuilder(Buffer.from(e, "utf-8"), {
                      name: "Error.txt",
                  })
                : null,
            o.length > 1014
                ? new AttachmentBuilder(Buffer.from(o, "utf-8"), {
                      name: "Origin.txt",
                  })
                : null,
        ],
        embeds: [
            client.embed(undefined, {
                title: `Uncaught Exception Monitor ${error.message}`,
                fields: [
                    {
                        name: "Error",
                        value: `\`\`\`${
                            e.length > 1014 ? "See Error.txt" : e
                        }\`\`\``,
                    },
                    {
                        name: "Origin",
                        value: `\`\`\`${
                            o.length > 1014 ? "See Origin.txt" : o
                        }\`\`\``,
                    },
                ],
                url: "https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor",
                timestamp: true,
            }),
        ],
    });
});
