import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { TeamService } from '../service';

@Module({
  imports: [DataBaseModule],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
