import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { PlayerService } from '../service';

@Module({
  imports: [DataBaseModule],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
