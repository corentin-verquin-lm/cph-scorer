import { Module } from '@nestjs/common';
import { PlayerModule } from '../../module/player.module';
import { RoundModule } from '../../module/round.module';
import { TeamModule } from '../../module/team.module';
import { TournamentController } from './tournament.controller';

@Module({
  imports: [PlayerModule, TeamModule, RoundModule],
  controllers: [TournamentController],
})
export class TournamentHttpModule {}
