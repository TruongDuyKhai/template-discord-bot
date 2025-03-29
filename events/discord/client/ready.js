const { AttachmentBuilder } = require("discord.js");

module.exports = {
    name: "ready",
    async execute(client) {
        if (!client.configs.settings.guildId) {
            throw new Error("Missing guild id in settings config file.");
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
        const figlet = require("figlet");
        figlet(client.user.username, (err, data) => {
            if (err) {
                console.log("Error: ", err);
                return;
            }
            console.log(data);
            console.log(
                `Invite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8&guild_id=${client.configs.settings.guildId}`
            );
        });

        setInterval(() => {
            client.sendWebhook(process.env.WEBHOOK_BACKUP, {
                files: [
                    new AttachmentBuilder("json.sqlite", {
                        name: "json.sqlite",
                    }),
                ],
            });
        }, 60 * 60 * 1000);
    },
};
