import { Module } from '@nestjs/common';
import { PlayerModule } from '../../module/player.module';
import { RankingModule } from '../../module/ranking.module';
import { PlayerController } from './player.controller';

@Module({
  imports: [PlayerModule, RankingModule],
  controllers: [PlayerController],
})
export class PlayerHttpModule {}
