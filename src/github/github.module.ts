import { Module } from '@nestjs/common';
import { GithubTrendController } from './controller/github-trend.controller';
import { GithubService } from './service/github.service';

@Module({
  imports: [],
  controllers: [GithubTrendController],
  providers: [GithubService],
})
export class GithubModule {}
