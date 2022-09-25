import { Controller, Get } from '@nestjs/common';
import { ProgrammingLanguage } from '../model/language';
import { Repo } from '../model/repo';
import { GithubService } from '../service/github.service';

@Controller('trend')
export class GithubTrendController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repos')
  async getTrendingRepo(): Promise<Repo[]> {
    return await this.githubService.getTrendingRepos();
  }

  @Get('langs')
  async getAllProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    return await this.githubService.getAllProgrammingLanguages();
  }
}
