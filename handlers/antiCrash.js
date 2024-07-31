require('colors');
const excepts = [
    'Socket connection timeout',
    'fetch failed',
    'Unknown interaction',
    'Unexpected end of JSON input',
    `is not valid JSON`,
    'Cannot perform IP discovery - socket closed',
    'AggregateError',
    'read ECONNRESET',
    'connection <monitor> to',
    'Connect Timeout Error',
    'connection timed out',
    'Request aborted',
    'getaddrinfo ENOTFOUND',
    'Opening handshake has timed out'
];
const client = require(`../index`);
const { inspect } = require('util');
client.on("error", (e) => {
    client.sendWebhook(process.env.WEBHOOK_LOG, {
        embeds: [
            client.embed(`\`\`\`\n${inspect(e, { depth: 0 })}\n\`\`\``, {
                title: 'Error',
                url: 'https://discordjs.guide/popular-topics/errors.html#api-errors',
                timestamp: true,
            })
        ]
    })
});

process.on("unhandledRejection", async (reason, p) => {
    if(excepts.find(e => reason.message.search(e) !== -1)) return;
    console.log(reason + '\n' + p);
    client.sendWebhook(process.env.WEBHOOKLOG, {
        embeds: [
            client.embed(undefined, {
                title: `Unhandled Rejection/Catch: ${reason.message}`,
                fields: [
                    {
                        name: 'Reason',
                        value: `\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\``.substring(0, 1000)
                    },
                    {
                        name: "Promise",
                        value: `\`\`\`\n${inspect(p, { depth: 0 })}\n\`\`\``.substring(0, 1000)
                    }
                ],
                url: 'https://nodejs.org/api/process.html#event-unhandledrejection',
                timestamp: true,
            })
        ]
    })
});

process.on("uncaughtException", async (e, origin) => {
    console.log(e + '\n' + origin);
    client.sendWebhook(process.env.WEBHOOKLOG, {
        embeds: [
            client.embed(undefined, {
                title: `Uncaught Exception/Catch ${e.message}`,
                fields: [
                    {
                        name: 'Error',
                        value: `\`\`\`\n${inspect(e, { depth: 0 })}\n\`\`\``.substring(0, 1000)
                    },
                    {
                        name: "Origin",
                        value: `\`\`\`\n${inspect(origin, { depth: 0 })}\n\`\`\``.substring(0, 1000)
                    }
                ],
                url: 'https://nodejs.org/api/process.html#event-uncaughtexception',
                timestamp: true,
            })
        ]
    })
});

process.on("uncaughtExceptionMonitor", async (e, origin) => {
    console.log(e + '\n' + origin);
    client.sendWebhook(process.env.WEBHOOKLOG, {
        embeds: [
            client.embed(undefined, {
                title: `Uncaught Exception Monitor ${e.message}`,
                fields: [
                    {
                        name: 'Error',
                        value: `\`\`\`${inspect(e, { depth: 0 })}\`\`\``.substring(0, 1000)
                    },
                    {
                        name: "Origin",
                        value: `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000)
                    },
                ],
                url: 'https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor',
                timestamp: true,
            })
        ]
    })
});