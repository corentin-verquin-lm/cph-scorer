import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { MatchService } from '../service';

@Module({
  imports: [DataBaseModule],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
