import dotenv from 'dotenv'

const keys = [
    'DATABASE_URL',
    'NODE_ENV',
    'JWT_SECRET',
    'SMTP_PASSWORD',
    'WEB_URL',
] as const

interface env {
    DATABASE_URL: string
    NODE_ENV: string
    JWT_SECRET: string
    SMTP_PASSWORD: string
    WEB_URL: string
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
    return {
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        JWT_SECRET: process.env.JWT_SECRET!,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
        WEB_URL: process.env.WEB_URL!,
    }
}

export const ENV = env()
