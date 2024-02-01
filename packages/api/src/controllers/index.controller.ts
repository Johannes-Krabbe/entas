import { Hono } from 'hono'
import { prisma } from '../../prisma/client'
import { sendVerificationEmail, signup } from '../services/auth.service'
import { sendWithDiscord } from '../helpers/discord.helper'
import { getVerifyEmailHtml } from '../emails/VerifyEmail'
import { sendEmail } from '../helpers/email.helper'

export const indexController = new Hono()

indexController.get('/', (c) => c.text('This is the Entas API', 200))

indexController.post('/user', async (c) => {
    const user = await prisma.user.create({
        data: {
            email: 'Johannes@dings.dings',
            username: 'johannes',
            password: '1234',
        },
    })
    return c.json(user, 200)
})

indexController.post('/email', async (c) => {
    let user = await prisma.user.findUnique({
        where: {
            email: 'johannes@krabbe.dev',
        },
    })

    if (!user) {
        user = (
            await signup({
                username: 'johannes',
                email: 'johannes@krabbe.dev',
                password: '1234',
            })
        ).user
    }
    sendVerificationEmail(user)
    return c.json({ success: true }, 200)
})

indexController.post('/discord', async (c) => {
    await sendWithDiscord('Test message from the Entas API')

    return c.json({ success: true }, 200)
})

indexController.get('/test', async (c) => {
    const html = getVerifyEmailHtml({
        name: 'Johannes',
        verificationUrl: 'https://entas.dev',
    })
    sendEmail('Johannes@Krabbe.dev', 'Test', html)

    return c.json({ success: true }, 200)
})
