import { PlayerProvider } from '../provider';
import { Player } from '../model';

export class UpdatePlayer {
  constructor(private readonly playerProvider: PlayerProvider) {}

  public async execute(id: uuid, player: Partial<Player>): Promise<Player> {
    return await this.playerProvider.update(id, player);
  }
}
