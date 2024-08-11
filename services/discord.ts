// Require the necessary discord.js classes
const { EmbedBuilder, WebhookClient } = require('discord.js');



export const sendDiscordMessage = (jobAddresses, nBlocks) => {
    const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL || '' });

    const embed = new EmbedBuilder()
        .setTitle('Jobs Without Work Execution')
        .setDescription(`The following jobs didn't execute the work method on the last ${nBlocks} blocks:\n ${jobAddresses.join('\n')}`)
        .setColor(0x00FFFF);
    
    return webhookClient.send({
        content: '',
        username: 'check-job-work',
        avatarURL: 'https://i.imgur.com/AfFp7pu.png',
        embeds: [embed],
    });
}