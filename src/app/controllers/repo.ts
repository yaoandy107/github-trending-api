import { FastifyReply, FastifyRequest } from 'fastify'
import { DateRange, fetchTrendingRepos } from "../../crawler"
import { HTTP_CODE } from '../constants/index'
import { IRepoQuerystring } from '../interface/index'

export const getTrendingRepo = async (
    request: FastifyRequest<{ Querystring: IRepoQuerystring }>,
    reply: FastifyReply,
) => {
    try {
        const { lang: language, range: dateRange, spokenLang: spokenLanguage } = request.query
        console.log(request.query)
        const data = await fetchTrendingRepos(
            language,
            <DateRange>dateRange,
            spokenLanguage
        )
        reply.code(HTTP_CODE.SUCCESS).send(data)
    } catch (e) {
        console.log(e)
        reply.code(HTTP_CODE.UNEXPECTED_ERROR).send()
    }
}