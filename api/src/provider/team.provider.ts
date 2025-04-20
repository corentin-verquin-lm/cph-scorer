import { Player, Team } from '../model';

export interface TeamProvider {
  insert: (players: Player[]) => Promise<Team>;
  update: (id: uuid, score: number) => Promise<Team>;
  deleteAll: () => Promise<void>;
}
