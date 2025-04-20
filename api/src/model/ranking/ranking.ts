import { Player, RankingType } from '../../model';

export class Ranking {
  public id: uuid;

  public participation: number;

  public point: number;

  public goalAverage: number;

  public type: RankingType;

  public players: Player[];

  constructor(props?: Partial<Ranking>) {
    if (props != null) Object.assign(this, props);
  }
}
