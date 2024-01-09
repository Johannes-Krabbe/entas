import dotenv from 'dotenv'

const keys = ['DATABASE_URL', 'NODE_ENV', 'JWT_SECRET'] as const

interface env {
    DATABASE_URL: string
    NODE_ENV: string
    JWT_SECRET: string
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
    }
}

export const ENV = env()
