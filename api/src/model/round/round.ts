import { Match } from '../../model';

export class Round {
  public id: uuid;

  public roundNumber: number;

  public matchs: Match[];

  constructor(props?: Partial<Round>) {
    if (props != null) Object.assign(this, props);
  }
}
