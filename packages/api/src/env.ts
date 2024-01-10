import dotenv from 'dotenv'

const keys = [
    'DATABASE_URL',
    'NODE_ENV',
    'JWT_SECRET',
    'SMTP_PASSWORD',
    'WEB_URL',
    'DISCORD_BOT_TOKEN',
] as const

interface env {
    DATABASE_URL: string
    NODE_ENV: 'development' | 'production' | 'test'
    JWT_SECRET: string
    SMTP_PASSWORD: string
    WEB_URL: string
    DISCORD_BOT_TOKEN: string
}

function env(): env {
    if (process.env.NODE_ENV === 'test') {
        dotenv.config({ path: '.env.test' })
    }
    for (const key of keys) {
        if (key === 'NODE_ENV') {
            continue
        }
        if (process.env[key] === undefined) {
            throw new Error(`Environment variable ${key} is undefined`)
        }
    }
    if (
        process.env.NODE_ENV !== 'test' &&
        process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== 'production'
    ) {
        throw new Error(`Environment variable NODE_ENV is not valid`)
    }
    return {
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        JWT_SECRET: process.env.JWT_SECRET!,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
        WEB_URL: process.env.WEB_URL!,
        DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN!,
    }
}

export const ENV = env()
