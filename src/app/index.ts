import Fastify from 'fastify'
import { repoRouter } from './routers/repo'


export const createServer = async () => {
    const server = Fastify({
        logger: true
    })

    server.register(repoRouter, { prefix: '/api/repo'})

    server.listen({ port: 3000 }, (err, address) => {
        if (err) throw err
        // Server is now listening on ${address}
    })
}
