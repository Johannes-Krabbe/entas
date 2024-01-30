import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const authController = new Hono()

authController.get('/verify-email', (c) => {
    return c.text('This is the Entas API', 200)
})

const schema = z.object({
    name: z.string(),
    age: z.string(),
})

authController.post(
    '/post',
    zValidator('json', schema, (result, c) => {
        if (!result.success) {
            return c.text('Invalid!', 400)
        }
    }),
    (c) => {
        return c.json({ success: true }, 200)
    }
)
