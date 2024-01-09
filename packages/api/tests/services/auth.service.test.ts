import { test, expect } from 'bun:test'
import { login, signup } from '../../src/services/auth.service'
import { decode } from 'hono/jwt'
import { prisma } from '../../prisma/client'

test('signup', async () => {
    const userData = {
        email: 'test@test.test',
        username: 'test',
        password: 'test',
    }

    const undefUser = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    })

    const signupResponse = await signup(userData)

    const user = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    })

    const nameUser = await prisma.user.findUnique({
        where: {
            username: userData.username,
        },
    })

    const tokenData = decode(signupResponse.token)

    expect(undefUser).toBeNull()
    expect(user).toBeDefined()
    expect(nameUser).toBeDefined()
    expect(signupResponse.user).toBeDefined()

    if (!user || !nameUser) {
        throw new Error('User not found')
    }

    expect(user.id).toBe(nameUser.id)
    expect(user.id).toBe(signupResponse.user.id)

    expect(signupResponse.user.email).toBe(userData.email)
    expect(signupResponse.user.username).toBe(userData.username)
    expect(signupResponse.user.password).not.toBe(userData.password)

    expect(tokenData.payload).toBeDefined()
    expect(tokenData.payload.userId).toBe(user.id)
})
