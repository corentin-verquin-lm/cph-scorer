import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  PlayerEntity,
  TeamEntity,
  MatchEntity,
  RoundEntity,
  RankingEntity,
} from '../model';
import configuration from '../app/app.config';
import { InitMigration1617737108784 } from '../migrations/InitMigration';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: configuration.database,
  entities: [PlayerEntity, TeamEntity, MatchEntity, RoundEntity, RankingEntity],
  migrations: [InitMigration1617737108784],
  migrationsRun: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default config;