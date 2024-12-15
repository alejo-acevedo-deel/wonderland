import { WebhookClient, EmbedBuilder } from "discord.js";
import Notifier from "./notifier";


export default class Discord extends Notifier {
    webhookClient: WebhookClient;

    constructor() {
        super();

        this.webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL || '' });
    }

    send(embed) {
        return this.webhookClient.send({
            content: '',
            username: 'check-job-work',
            avatarURL: 'https://i.imgur.com/AfFp7pu.png',
            embeds: [embed],
        });
    }

    notifyJobNotExecuted(jobAddresses, nBlocks) {
        const embed = new EmbedBuilder()
            .setTitle('Jobs Without Work Execution')
            .setDescription(`The following jobs didn't execute the work method on the last ${nBlocks} blocks:\n ${jobAddresses.join('\n')}`)
            .setColor(0x00FFFF);

        this.send(embed)
    }

    notifyJobContactError(jobAddresses) {
        const embed = new EmbedBuilder()
            .setTitle('Jobs With Contact Error')
            .setDescription(`The following jobs cannot be contacted, please check logs to see error:\n ${jobAddresses.join('\n')}`)
            .setColor(0x00FFFF);

        this.send(embed)
    }
}