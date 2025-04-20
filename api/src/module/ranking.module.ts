import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { RankingService } from '../service';

@Module({
  imports: [DataBaseModule],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
