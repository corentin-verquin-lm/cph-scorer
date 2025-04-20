import { RankingType } from "../../src/model";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1617737108785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seed_player(queryRunner);
    await this.seed_ranking(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("delete from players");
  }

  private async seed_player(queryRunner: QueryRunner): Promise<void> {
    const player: number[] = new Array(16).fill(0).map((_, i) => i);

    for (const i of player) {
      await queryRunner.query(
        `insert into player values(default,'player${i}','player${i}',default)`
      );
    }
  }

  private async seed_ranking(queryRunner: QueryRunner): Promise<void> {
    const rank: string[] = (await queryRunner.query("select * from player"))
      .map((x: any) => x.id)
      .slice(0, 6);

    for (let i = 0; i < rank.length; i++) {
      await queryRunner.query(
        `insert into ranking values(default,default,default,default,'${
          i < 4 ? RankingType.SEN : RankingType.VET
        }')`
      );
    }
    const ids: string[] = (
      await queryRunner.query("select id from ranking;")
    ).map((x: any) => x.id);

    for (const [i, id] of ids.entries()) {
      await queryRunner.query(
        `insert into ranking_players_player values('${id}','${rank[i]}')`
      );
    }
  }
}
