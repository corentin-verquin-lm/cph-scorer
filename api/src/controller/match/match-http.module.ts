import { Module } from '@nestjs/common';
import { MatchModule } from '../../module/match.module';
import { RankingModule } from '../../module/ranking.module';
import { TeamModule } from '../../module/team.module';
import { MatchController } from './match.controller';

@Module({
  imports: [MatchModule, TeamModule, RankingModule],
  controllers: [MatchController],
})
export class MatchHttpModule {}
