import { Round } from '../model';

export interface RoundProvider {
  insert: (roundNumber: number) => Promise<Round>;
  getRound: (roundNumber: number) => Promise<Round>;
  deleteAll: () => Promise<void>;
}
