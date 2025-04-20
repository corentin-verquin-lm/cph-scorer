import { RoundProvider } from '../provider';
import { Round } from '../model';

export class GetRound {
  constructor(private readonly roundProvider: RoundProvider) {}

  public async execute(round: number): Promise<Round> {
    return await this.roundProvider.getRound(round);
  }
}
