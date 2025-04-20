import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { RoundService } from '../service';

@Module({
  imports: [DataBaseModule],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}
