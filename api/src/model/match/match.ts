import { Round, Team } from '../../model';

export class Match {
  public id: uuid;

  public teamOne: Team;

  public teamTwo: Team;

  public round: Round;

  constructor(props?: Partial<Match>) {
    if (props != null) Object.assign(this, props);
  }
}
