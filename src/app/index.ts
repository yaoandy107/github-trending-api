import Fastify from 'fastify'
import { repoRouter } from './routers/repo'


export const createServer = async () => {
    const server = Fastify({
        logger: true,
        trustProxy: true,
    })

    server.register(repoRouter, { prefix: '/api/repo' })

    const port: number = Number(process.env.PORT) || 3000
    server.listen({ host: '0.0.0.0', port: port }, (err, address) => {
        if (err) throw err
        // Server is now listening on ${address}
    })
}
