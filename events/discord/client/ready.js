const { AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(client) {
        await client.application.fetch();
        if (client.application.botPublic) {
            console.log(`[🤖] ${client.user.tag} in public mode. Exiting...`);
            process.exit();
        }
        if (client.guilds.cache.size > 1) {
            console.log(`[🤖] ${client.user.tag} in more than 1 guild. Exiting...`);
            process.exit();
        }
        require('../../../handlers/antiCrash');
        if (process.env.EXPRESS === 'true') {
            const express = require('express');
            const app = express();
            const port = client.configs.settings.port;
            app.get('/', (req, res) => res.send(`Ping: ${client.ws.ping} ms`));
            app.listen(port, () => {
                console.log(`Server is listening on port ${port}`);
            });
        }
        const figlet = require('figlet');
        figlet(client.user.username, (err, data) => {
            if (err) {
                console.log('Error: ', err);
                return;
            }
            console.log(data);
        })

        setInterval(() => {
            client.sendWebhook(process.env.WEBHOOK_BACKUP, {
                files: [
                    new AttachmentBuilder('json.sqlite', { name: 'json.sqlite' })
                ]
            })
        }, 60 * 60 * 1000);
    }
}