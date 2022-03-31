import { FastifyInstance } from "fastify"
import { DateRange } from "../../crawler"
import { HTTP_CODE } from "../constants"
import * as controllers from '../controllers'
import { IRepoQuerystring } from '../interface/index'

export async function repoRouter(
    fastify: FastifyInstance,
) {
    fastify.get<{
        Querystring: IRepoQuerystring
    }>('/', {
        preValidation: (request, reply, done) => {
            const { range: dateRange } = request.query
            if (!Object.values(DateRange).includes(dateRange as DateRange)) {
                reply.code(HTTP_CODE.BAD_REQUEST).send("range is not valid")
                return
            }
            done()
        }
    }, controllers.getTrendingRepo)
}
