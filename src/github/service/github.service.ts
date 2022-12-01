import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { URL_GIHUB_TRENDING, URL_GITHUB } from '../../constants';
import { DateRange } from '../model/date-range';
import { ProgrammingLanguage } from '../model/dto/language.dto';
import { Repo } from '../model/dto/repo.dto';

@Injectable()
export class GithubService {
  async getTrendingRepos(
    language = '',
    dateRange: DateRange = DateRange.TODAY,
    spokenLanguage = '',
  ): Promise<Repo[]> {
    const url = `${URL_GIHUB_TRENDING}/${language}?since=${dateRange}&spoken_language_code=${spokenLanguage}`;
    console.log(`Fetching ${url}.`);
    const response = await axios.get(url);
    const repos: Repo[] = [];
    const $ = cheerio.load(response.data);
    $('article').each((index, element) => {
      const titleElement = $('h1.h3 a', element);
      const link = `${URL_GITHUB}${titleElement.attr('href')}`;
      const title = titleElement.text().replace(/\s/g, '');
      const author = title.split('/')[0];
      const name = title.split('/')[1];
      const description = $(element).find('p').text().trim();
      const programmingLanguage = $(element)
        .find('[itemprop="programmingLanguage"]')
        .text();
      const stars = parseInt(
        $(element)
          .find(`[href="/${title.replace(/\s/g, '')}/stargazers"]`)
          .text()
          .trim()
          .replace(',', ''),
      );
      const forks = parseInt(
        $(element)
          .find(`[href="/${title.replace(/\s/g, '')}/network/members.${name}"]`)
          .text()
          .trim()
          .replace(',', ''),
      );
      const starsInRange = parseInt(
        $(element)
          .find(`span.float-sm-right:contains('stars')`)
          .text()
          .trim()
          .replace(',', '')
          .split(' ')[0],
      );
      const repo: Repo = {
        author,
        name,
        description,
        programmingLanguage,
        stars,
        forks,
        starsInRange,
        link,
      };

      repos.push(repo);
    });
    return repos;
  }

  async getAllProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    const url = URL_GIHUB_TRENDING;
    console.log(`Fetching ${url}.`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const availableLanguages = [];
    $('#languages-menuitems .select-menu-item').each((index, element) => {
      availableLanguages.push({
        name: $(element).find('.select-menu-item-text').text().trim(),
        code: element.attribs['href'].match(/\/trending\/(.+)\?.*/)[1],
      });
    });
    return availableLanguages;
  }
}
