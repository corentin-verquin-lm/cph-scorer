import { Module } from '@nestjs/common';
import { MatchModule } from '../../module/match.module';
import { PlayerModule } from '../../module/player.module';
import { RoundModule } from '../../module/round.module';
import { TeamModule } from '../../module/team.module';
import { RoundController } from './round.controller';

@Module({
  imports: [RoundModule, PlayerModule, TeamModule, MatchModule],
  controllers: [RoundController],
})
export class RoundHttpModule {}
