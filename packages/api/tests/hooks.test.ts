import { beforeAll, beforeEach } from 'bun:test'
import { prisma } from '../prisma/client'

beforeAll(async () => {})

beforeEach(async () => {
    // Clear database
    prisma.user.deleteMany()
    prisma.post.deleteMany()
})
