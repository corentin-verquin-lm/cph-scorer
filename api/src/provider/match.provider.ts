import { Match, Team, Round } from '../model';

export interface MatchProvider {
  insert: (teams: Team[], round: Round) => Promise<Match>;
}
