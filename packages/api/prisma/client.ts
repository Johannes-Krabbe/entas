import { PrismaClient } from '@prisma/client'
import { ENV } from '../src/env'
import { PrismockClient } from 'prismock'

export * from '@prisma/client'

export let prisma: PrismaClient

if (ENV.NODE_ENV === 'development') {
    prisma = new PrismaClient({
        datasourceUrl: ENV.DATABASE_URL,
    })
} else {
    prisma = new PrismockClient()
}

export { prisma as PrismaClient }
