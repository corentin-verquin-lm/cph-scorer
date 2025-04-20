import { PlayerProvider } from '../provider';
import { Player } from '../model';

export class ListPlayer {
  constructor(private readonly playerProvider: PlayerProvider) {}

  public async execute(): Promise<Player[]> {
    return await this.playerProvider.list();
  }
}
