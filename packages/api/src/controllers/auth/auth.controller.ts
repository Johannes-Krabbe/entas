import { Hono } from 'hono'
import { ENV } from '../../env'

export const authController = new Hono()

authController.get('/verify-email', (c) => {
    return c.text('This is the Entas API', 200)
})
