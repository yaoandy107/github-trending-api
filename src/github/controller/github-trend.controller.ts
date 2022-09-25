import { Controller, Get, Query } from '@nestjs/common';
import { ProgrammingLanguage } from '../model/dto/language.dto';
import { Repo } from '../model/dto/repo.dto';
import { GithubService } from '../service/github.service';
import { DateRange } from '../model/date-range';
import { ApiOkResponse, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('trend')
export class GithubTrendController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repos')
  @ApiQuery({ name: 'range', enum: DateRange })
  @ApiOkResponse({ type: [Repo] })
  async getTrendingRepo(
    @Query('lang') programmingLanguage: string,
    @Query('range') dateRange: DateRange,
  ): Promise<Repo[]> {
    return await this.githubService.getTrendingRepos(
      programmingLanguage,
      dateRange,
    );
  }

  @Get('langs')
  @ApiOkResponse({ type: [ProgrammingLanguage] })
  async getAllProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    return await this.githubService.getAllProgrammingLanguages();
  }
}
