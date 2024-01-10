import { Client, GatewayIntentBits, ChannelType, Message } from 'discord.js'
import { ENV } from '../env'

// Initialize Discord Bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

const TOKEN = ENV.DISCORD_BOT_TOKEN

const CHANNEL = {
    development: '1194677140243890277',
    production: '1194692148788985888',
}

client.login(TOKEN)

export async function sendWithDiscord(message: string) {
    if (ENV.NODE_ENV === 'test') return
    try {
        const channelId =
            ENV.NODE_ENV === 'production'
                ? CHANNEL.production
                : CHANNEL.development

        const channel = await client.channels.fetch(channelId)

        // Check if the channel is a text channel
        if (channel?.type === ChannelType.GuildText) {
            await channel.send(message)
        } else {
            console.error('The channel is not a text channel.')
        }
    } catch (error) {
        console.error('Error sending message to Discord:', error)
    }
}
