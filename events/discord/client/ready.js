const { AttachmentBuilder } = require("discord.js");

module.exports = {
    name: "clientReady",
    async execute(client) {
        if (!client.configs.settings.guildId) {
            throw new Error("Missing guild id.");
        }
        if (!client.configs.settings.inviteCode) {
            throw new Error("Missing guild invite code.");
        }
        if (!client.configs.settings.ownerUserIds[0]) {
            throw new Error("Missing owner bot.");
        }
        client.guilds.cache.forEach((e) => {
            if (client.configs.settings.guildId !== e.id) e.leave();
        });
        require("../../../handlers/antiCrash");
        if (process.env.EXPRESS === "true") {
            const express = require("express");
            const app = express();
            const port = client.configs.settings.port;
            app.get("/", (req, res) => res.send(`Ping: ${client.ws.ping} ms`));
            app.listen(port, () => {
                console.log(`Server is listening on port ${port}`);
            });
        }

        console.log(`Username: ${client.user.username}`);
        console.log(`Client ID: ${client.user.id}`);
        console.log(`Guild ID: ${client.configs.settings.guildId}`);
        console.log(`Guild Invite Code: ${client.configs.settings.inviteCode}`);
        console.log(
            `Invite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8&guild_id=${client.configs.settings.guildId}`
        );

        setInterval(() => {
            client.sendWebhook(process.env.WEBHOOK_BACKUP, {
                files: [
                    new AttachmentBuilder(".env", {
                        name: ".env",
                    }),
                    new AttachmentBuilder("json.sqlite", {
                        name: "json.sqlite",
                    }),
                ],
            });
        }, 60 * 60 * 1000);
    },
};
