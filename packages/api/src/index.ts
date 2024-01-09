import app from './app'
import { ENV } from './env'

// run env parser at startup
ENV

export default {
    port: 8080,
    fetch: app.fetch,
}
