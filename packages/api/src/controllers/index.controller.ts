import { Hono } from 'hono'
import { prisma } from '../../prisma/client'
import { sendVerificationEmail, signup } from '../services/auth.service'

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
