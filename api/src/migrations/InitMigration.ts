import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1617737108784 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TYPE "public"."ranking_type_enum" AS ENUM('SEN', 'VET', 'FEM')
    `);

    await queryRunner.query(`
      CREATE TABLE "player" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "firstName" character varying(30) NOT NULL,
        "lastName" character varying(30) NOT NULL,
        "register" boolean DEFAULT false NOT NULL,
        CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "team" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "score" integer DEFAULT 0 NOT NULL,
        CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "round" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "roundNumber" integer NOT NULL,
        CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "ranking" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "participation" integer DEFAULT 1 NOT NULL,
        "point" integer DEFAULT 0 NOT NULL,
        "goalAverage" integer DEFAULT 0 NOT NULL,
        "type" "public"."ranking_type_enum" NOT NULL,
        CONSTRAINT "PK_bf82b8f271e50232e6a3fcb09a9" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "match" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "teamOneId" uuid,
        "teamTwoId" uuid,
        "roundId" uuid,
        CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"),
        CONSTRAINT "REL_eb4acdc7b8fc670e620d4dc8ee" UNIQUE ("teamOneId"),
        CONSTRAINT "REL_9185ce7c50efa65ed6410b732f" UNIQUE ("teamTwoId")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "team_players_player" (
        "teamId" uuid NOT NULL,
        "playerId" uuid NOT NULL,
        CONSTRAINT "PK_30ad7c7427cb452e63ff4d4f9a0" PRIMARY KEY ("teamId", "playerId")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "ranking_players_player" (
        "rankingId" uuid NOT NULL,
        "playerId" uuid NOT NULL,
        CONSTRAINT "PK_7dd606053deeb5b486bf06ca00c" PRIMARY KEY ("rankingId", "playerId")
      )
    `);

    // Indexes
    await queryRunner.query(`CREATE INDEX "IDX_03530e45522b82c6ae46d825dd" ON "team_players_player" ("teamId")`);
    await queryRunner.query(`CREATE INDEX "IDX_a5a5ca467eb43bf810ce32a119" ON "team_players_player" ("playerId")`);
    await queryRunner.query(`CREATE INDEX "IDX_92195cc8797500b84531484260" ON "ranking_players_player" ("rankingId")`);
    await queryRunner.query(`CREATE INDEX "IDX_7550a8fc095c59a648917b9535" ON "ranking_players_player" ("playerId")`);

    // Foreign keys
    await queryRunner.query(`
      ALTER TABLE "team_players_player"
      ADD CONSTRAINT "FK_03530e45522b82c6ae46d825dd1" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON UPDATE CASCADE ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "team_players_player"
      ADD CONSTRAINT "FK_a5a5ca467eb43bf810ce32a119d" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON UPDATE CASCADE ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "ranking_players_player"
      ADD CONSTRAINT "FK_92195cc8797500b845314842607" FOREIGN KEY ("rankingId") REFERENCES "ranking"("id") ON UPDATE CASCADE ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "ranking_players_player"
      ADD CONSTRAINT "FK_7550a8fc095c59a648917b95356" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON UPDATE CASCADE ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "match"
      ADD CONSTRAINT "FK_eb4acdc7b8fc670e620d4dc8eee" FOREIGN KEY ("teamOneId") REFERENCES "team"("id") ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "match"
      ADD CONSTRAINT "FK_9185ce7c50efa65ed6410b732fc" FOREIGN KEY ("teamTwoId") REFERENCES "team"("id") ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "match"
      ADD CONSTRAINT "FK_1118562c3d9e68a7c7d680c7afd" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop dans l'ordre inverse pour respecter les contraintes FK
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_1118562c3d9e68a7c7d680c7afd"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_9185ce7c50efa65ed6410b732fc"`);
    await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_eb4acdc7b8fc670e620d4dc8eee"`);

    await queryRunner.query(`ALTER TABLE "ranking_players_player" DROP CONSTRAINT "FK_7550a8fc095c59a648917b95356"`);
    await queryRunner.query(`ALTER TABLE "ranking_players_player" DROP CONSTRAINT "FK_92195cc8797500b845314842607"`);

    await queryRunner.query(`ALTER TABLE "team_players_player" DROP CONSTRAINT "FK_a5a5ca467eb43bf810ce32a119d"`);
    await queryRunner.query(`ALTER TABLE "team_players_player" DROP CONSTRAINT "FK_03530e45522b82c6ae46d825dd1"`);

    await queryRunner.query(`DROP INDEX "IDX_7550a8fc095c59a648917b9535"`);
    await queryRunner.query(`DROP INDEX "IDX_92195cc8797500b84531484260"`);
    await queryRunner.query(`DROP INDEX "IDX_a5a5ca467eb43bf810ce32a119"`);
    await queryRunner.query(`DROP INDEX "IDX_03530e45522b82c6ae46d825dd"`);

    await queryRunner.query(`DROP TABLE "ranking_players_player"`);
    await queryRunner.query(`DROP TABLE "team_players_player"`);
    await queryRunner.query(`DROP TABLE "match"`);
    await queryRunner.query(`DROP TABLE "ranking"`);
    await queryRunner.query(`DROP TABLE "round"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "player"`);

    await queryRunner.query(`DROP TYPE "public"."ranking_type_enum"`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
