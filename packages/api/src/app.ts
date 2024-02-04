import { Hono } from 'hono'
import router from './router'
import { ServiceError } from '../types/error.types'
import { sendWithDiscord } from './helpers/discord.helper'
import { ENV } from './env'

const app = new Hono()

app.onError((err, c) => {
    if (err instanceof ServiceError) {
        sendWithDiscord(
            `PRODUCTION ERROR: \n ${'```'}\n${JSON.stringify(
                err.error,
                null,
                2
            )}\n${'```'}\n` +
                `URL: ${c.req.url}\n` +
                `ROUTE PATH: ${c.req.routePath}\n` +
                `Method: ${c.req.method}\n` +
                `IP: ${JSON.stringify(c.req, null, 2)}\n` +
                `User-Agent: ${c.req.header('user-agent')}`
        )
        if (ENV.NODE_ENV === 'production') {
        } else {
            console.log(c)
            console.error(err.error)
        }

        return c.json(err.error, 500)
    }

    return c.json({ error: err.message }, 500)
})

app.route('', router)
export default app
