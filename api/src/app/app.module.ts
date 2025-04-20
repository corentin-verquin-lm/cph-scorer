import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHttpModule } from '../controller/match/match-http.module';
import { PlayerHttpModule } from '../controller/player/player-http.module';
import { RankingHttpModule } from '../controller/ranking/ranking-http.module';
import { RoundHttpModule } from '../controller/round/round-http.module';
import { TournamentHttpModule } from '../controller/tournament/tournament-http.module';
import databaseConfig from '../db/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PlayerHttpModule,
    MatchHttpModule,
    RankingHttpModule,
    RoundHttpModule,
    TournamentHttpModule,
  ],
})
export class AppModule {}
