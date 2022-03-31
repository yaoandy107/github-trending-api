import axios from 'axios'
import cheerio from 'cheerio'
import { Repo } from '../models/repo'

const trendingUrl = 'https://github.com/trending'

export enum DateRange {
    TODAY = 'daily',
    THIS_WEEK = 'weekly',
    THIS_MONTH = 'monthly',
}

export async function fetchTrendingRepos(language = "", dateRange: DateRange = DateRange.TODAY, spokenLanguage = "any"): Promise<Repo[]> {
    const url = `${trendingUrl}/${language}?since=${dateRange}&spoken_language_code=${spokenLanguage}`
    console.log(`Fetching ${url}.`)
    const response = await axios.get(url)
    return parseTrendingRepos(response.data)
}

function parseTrendingRepos(content: string): Repo[] {
    const repos: Repo[] = []
    const $ = cheerio.load(content)
    $('article').each((index, element) => {
        const title = $("h1.h3 a", element)
            .text()
            .replace(/\s/g, "")
        const author = title.split('/')[0]
        const name = title.split('/')[1]
        const desciption = $(element).find("p").text().trim()
        const stars = parseInt(
            $(element).find(`[href="/${title.replace(/\s/g, '')}/stargazers"]`)
                .text()
                .trim()
                .replace(',', '')
        )
        const forks = parseInt(
            $(element).find(`[href="/${title.replace(/\s/g, '')}/network/members.${name}"]`)
                .text()
                .trim()
                .replace(',', '')
        )
        const starsInRange = parseInt(
            $(element).find(`span.float-sm-right:contains('stars')`)
                .text()
                .trim()
                .replace(',', '')
                .split(' ')[0]
        )
        const repo = {
            author: author,
            name: name,
            desciption: desciption,
            stars: stars,
            forks: forks,
            starsInRange: starsInRange,
        }

        repos.push(repo)
    })
    return repos
}
