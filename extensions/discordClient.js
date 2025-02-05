const discord = require('discord.js');
const { QuickDB } = require('quick.db');

class Client extends discord.Client {
    constructor(options) {
        super(options);
    }

    discord = discord;
    configs = require('../handlers/configs').load();
    events = require('../handlers/events').load();
    funcs = require('../handlers/functions').load();
    slashCommands = require('../handlers/commands').load();

    db = new QuickDB();
    fs = require('fs');
    axios = require('axios');

    getUser = (id, message, i = 0) => !id ? null : message?.mentions.users.map(e => e)[i] || message?.guild.members.cache.get(id)?.user || message?.guild.members.cache.find(e => e.user.username.toLowerCase().search(id?.toLowerCase()) >= 0)?.user || this.users.cache.get(id) || this.users.cache.find(e => e.username.toLowerCase().search(id?.toLowerCase()) >= 0) || this.users.fetch(id).catch(e => undefined);

    embed(description, options = {}) {
        if (typeof description === 'object') options = description;
        return {
            url: options.url || null,
            color: options.color ? this.funcs.hexToInt(options.color) : this.funcs.hexToInt(this.configs.embed.color),
            description: typeof description === 'object' ? options.description : description,
            title: options.title || null,
            footer: options.footer,
            timestamp: options.timestamp ? new Date().toISOString() : null,
            thumbnail: options.thumbnail || null,
            fields: options.fields || [],
            image: options.image || null,
            author: options.author || null,
        }
    }

    async fetch(url, method, body, timeout = 5000) {
        return await this.funcs.fetchWithTimeout(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        }, timeout);
    }

    async sendWebhook(url, options) {
        const webhook = new discord.WebhookClient({ url });
        return await webhook.send(options);
    }

    init() {
        this.login(this.options.token).then(() => {
            this.application.commands.set(this.slashCommands.map(e => e.data.toJSON()));
        });
        require('../handlers/events').init(this);
    }
}

module.exports = Client;