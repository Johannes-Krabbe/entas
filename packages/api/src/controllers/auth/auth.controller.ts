import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import z from 'zod'
import { signup } from '../../services/auth.service'
import { parseMeUser } from '../../schemas/user.schema'

export const authController = new Hono()

const zSignupSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
})

authController.post('/signup', zValidator('json', zSignupSchema), async (c) => {
    const data = c.req.valid('json')
    const { user, token } = await signup(data)
    return c.json({ success: true, token, user: parseMeUser(user) }, 201)
})
