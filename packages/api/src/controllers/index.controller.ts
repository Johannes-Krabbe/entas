import { Hono } from 'hono'
import { prisma } from '../../prisma/client'
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
    const message = await sendEmail('johannes@krabbe.dev', 'Test', 'test')

    return c.json({ success: true, message }, 200)
})
