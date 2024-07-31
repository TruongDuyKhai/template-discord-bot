const { Message, ActionRowBuilder, ButtonBuilder, InteractionCollector, Collector } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {import('discord.js').MessageCreateOptions} msgOptions 
 * @param {Object} options 
 * @param {Boolean} options.skip 
 * @param {Boolean} options.remove 
 * @param {Boolean} options.stop 
 * @param {(interaction: InteractionCollector, message: Message, collector: Collector) => void} callback
 */
async function swapPage(message, msgOptions, options = {}, callback = (interaction, message, collector) => { }) {
    const type1 = message instanceof Message ? 'reply' : 'followUp';
    const type2 = type1 == 'reply' ? 'edit' : 'editReply';
    const { skip = false, remove = false, stop = true } = options;

    let currentPage = 0;
    const row = new ActionRowBuilder().addComponents(
        [skip ? new ButtonBuilder()
            .setStyle('Secondary')
            .setEmoji('⏪')
            .setCustomId('first-page') : null,
        new ButtonBuilder()
            .setStyle('Secondary')
            .setEmoji('◀️')
            .setCustomId('back-page'),
        stop ? new ButtonBuilder()
            .setStyle('Secondary')
            .setEmoji('⛔')
            .setCustomId('stop-page') : null,
        new ButtonBuilder()
            .setStyle('Secondary')
            .setEmoji('▶️')
            .setCustomId('next-page'),
        skip ? new ButtonBuilder()
            .setStyle('Secondary')
            .setEmoji('⏩')
            .setCustomId('last-page') : null].filter(e => e)
    )

    if (msgOptions[1])
        msgOptions = msgOptions.map(option => {
            option.components = option.components ? [...option.components, row] : [row];
            return option
        })

    const msg = await message[type1](msgOptions[0]);

    if (!msgOptions[0].components) return;

    let filter = (i) => i.user.id === (message.author?.id || message.user?.id) && i.message.id === msg.id;

    const collector = await msg.channel.createMessageComponentCollector({
        filter,
        idle: 60000
    })

    collector.on('collect', async (interaction) => {
        callback(interaction, msg, collector);
        await interaction.deferUpdate().catch(() => { });
        switch (interaction.customId) {
            case "first-page": {
                currentPage = 0
            }
                break;
            case "back-page": {
                currentPage = currentPage === 0 ? msgOptions.length - 1 : currentPage - 1
            }
                break;
            case "next-page": {
                currentPage = currentPage === msgOptions.length - 1 ? 0 : currentPage + 1
            }
                break;
            case "last-page": {
                currentPage = msgOptions.length - 1
            }
                break;
            default: {
                currentPage = -1
            }
                break;
        }

        if (currentPage >= 0) {
            try { interaction[type2](msgOptions[currentPage]) } catch (e) { msg[type2](msgOptions[currentPage]) }
        }
        else {
            collector.stop();
        }
    })

    collector.on('end', async (collected, reason) => {
        if (reason == true) return;
        const components = msg.components.map(x => {
            x.components = x.components.map(v => {
                v.data.disabled = true;

                return v;
            });

            return x;
        })
        if (remove) {
            msg.delete().catch(e => {
                try {
                    message.editReply({
                        components
                    })
                } catch (e) {
                    msg.edit({
                        components
                    })
                }
            })
        } else {
            try {
                message.editReply({
                    components
                })
            } catch (e) {
                msg.edit({
                    components
                })
            }
        }
    })
}

module.exports = swapPage;