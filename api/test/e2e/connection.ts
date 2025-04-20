import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { Seed1617737108785 } from './0-seed';
import { InitMigration1617737108784 } from '../../src/migrations/InitMigration';
import configuration from '../../src/app/app.config';
import {
  MatchEntity,
  PlayerEntity,
  RankingEntity,
  RoundEntity,
  TeamEntity,
} from '../../src/model';

export default async function connect(...moduleToLoad: any) {
  const module = await Test.createTestingModule({
    imports: [
      ...moduleToLoad,
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: configuration.database,
        entities: [
          PlayerEntity,
          TeamEntity,
          MatchEntity,
          RoundEntity,
          RankingEntity,
        ],
        dropSchema: true,
        synchronize: true,
        migrations: [InitMigration1617737108784, Seed1617737108785],
        migrationsRun: true,
      }),
    ],
  }).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.init();
  return app;
}
